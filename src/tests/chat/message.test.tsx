import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Message from '@/components/chat/message';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('Message', () => {
  const defaultProps = {
    content: 'Hello, how are you?',
    src: 'https://example.com/avatar.jpg',
    userImage: 'https://example.com/user.jpg',
  };

  it('should render user message correctly', () => {
    render(<Message {...defaultProps} role="user" />);

    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();

    const userAvatar = screen.getByTestId('user-avatar');
    expect(userAvatar).toBeInTheDocument();

    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveClass('justify-end');
  });

  it('should render system message correctly', () => {
    render(<Message {...defaultProps} role="system" />);

    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();

    const systemAvatar = screen.getByTestId('guest-avatar');
    expect(systemAvatar).toBeInTheDocument();

    const copyButton = screen.getByRole('button');
    expect(copyButton).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<Message {...defaultProps} role="system" isLoading />);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should copy message to clipboard when copy button is clicked', () => {
    render(<Message {...defaultProps} role="system" />);

    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello, how are you?');

    expect(toast.success).toHaveBeenCalledWith('Message Copied to Clipboard.');
  });

  it('should not show copy button for user messages', () => {
    render(<Message {...defaultProps} role="user" />);

    const copyButton = screen.queryByRole('button');
    expect(copyButton).not.toBeInTheDocument();
  });
});
