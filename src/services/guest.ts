import prismadb from '@/lib/prisma';

const getGuests = async () => {
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

export { getGuests };
