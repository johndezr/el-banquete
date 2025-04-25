import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Messages from '@/components/chat/messages';
import type { Guest, Message } from '@prisma/client';

// Mock setTimeout and clearTimeout
vi.useFakeTimers();

describe('Messages', () => {
  const mockGuest: Guest = {
    id: '1',
    name: 'Fedro',
    imgUrl: 'https://example.com/fedro.jpg',
    description: 'A philosopher from ancient Greece',
    instructions: 'Test instructions',
    seed: 'Test seed',
    createdAt: new Date(),
    updatedAt: new Date(),
    virtues: ['wisdom'],
  };

  const mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hello',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      guestId: '1',
      userId: 'user1',
    },
    {
      id: '2',
      content: 'Hi there!',
      role: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
      guestId: '1',
      userId: 'user1',
    },
  ];

  const defaultProps = {
    guest: mockGuest,
    messages: mockMessages,
    isLoading: false,
    userImageUrl: 'https://example.com/user.jpg',
  };

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('should render initial greeting message', () => {
    render(<Messages {...defaultProps} />);
    expect(
      screen.getByText(`Hello, I'm ${mockGuest.name}, ${mockGuest.description}.`)
    ).toBeInTheDocument();
  });

  it('should render all messages', () => {
    render(<Messages {...defaultProps} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('should show loading state for initial greeting', () => {
    render(<Messages {...defaultProps} messages={[]} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('should show loading state for new messages', () => {
    render(<Messages {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should scroll to bottom when messages change', () => {
    const { rerender } = render(<Messages {...defaultProps} messages={[]} />);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);

    rerender(<Messages {...defaultProps} messages={mockMessages} />);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('should not show loading state for initial greeting when messages exist', () => {
    render(<Messages {...defaultProps} />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
