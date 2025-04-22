import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Home from '../app/page';
import { getGuests } from '../services/guest';
import type { Guest } from '@prisma/client';

vi.mock('@/services/guest', () => ({
  getGuests: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockGuests: (Guest & { _count: { messages: number } })[] = [
  {
    id: '1',
    name: 'Fedro',
    imgUrl: 'https://i.pravatar.cc/150?img=1',
    description: "You are Phaedrus from Plato's The Symposium (or The Banquet).",
    instructions:
      'You are described as a young man whose passions have been purified by the study of philosophy.',
    seed: 'Human: Hello, how are you?',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      messages: 0,
    },
  },
  {
    id: '2',
    name: 'Pausanias',
    imgUrl: 'https://i.pravatar.cc/150?img=2',
    description: 'You are Pausanias.',
    instructions: 'Your are portrayed as a mature man who has learned from age and philosophy.',
    seed: 'Human: Hello, how are you?',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      messages: 0,
    },
  },
];

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the guest cards', async () => {
    vi.mocked(getGuests).mockResolvedValueOnce(mockGuests);

    await act(async () => {
      render(await Home());
    });

    const guestCards = await screen.findAllByRole('article');

    expect(guestCards).toHaveLength(2);
    expect(screen.getByText('Fedro')).toBeInTheDocument();
    expect(screen.getByText('Pausanias')).toBeInTheDocument();
  });
});
