import { PrismaClient } from '@prisma/client';
import guestsSeed from './seed/guest.json';

const prisma = new PrismaClient();

async function main() {
  try {
    const guests = await prisma.guest.createMany({
      data: guestsSeed,
    });
    console.log(guests);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
