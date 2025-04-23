import prismadb from '@/lib/prisma';
import { Role } from '@prisma/client';

const getAllGuests = async () => {
  try {
    const guests = await prismadb.guest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
    return guests;
  } catch (error) {
    throw new Error('Failed to fetch guests', { cause: error });
  }
};

const pushNewMessage = async (prompt: string, role: string, guestId: string, userId: string) => {
  try {
    const guest = await prismadb.guest.update({
      where: { id: guestId },
      data: {
        messages: {
          create: {
            content: prompt,
            role: role as Role,
            userId,
          },
        },
      },
    });
    return guest;
  } catch (error) {
    throw new Error('Failed to push new message', { cause: error });
  }
};
const getGuestById = async (id: string) => {
  try {
    const guest = await prismadb.guest.findUnique({
      where: { id },
    });
    return guest;
  } catch (error) {
    throw new Error('Failed to fetch guest', { cause: error });
  }
};

export { getAllGuests, getGuestById, pushNewMessage };
