// import { SearchInput } from '@/components/search-input';
import { CardGuest } from '@/components/card-guest';
import { getAllGuests } from '@/services/guest';
import { Guest } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Underdog } from 'next/font/google';

const underdog = Underdog({
  variable: '--font-underdog',
  subsets: ['latin'],
  weight: '400',
});

export default async function Home() {
  const guests = await getAllGuests();

  return (
    <section className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center">
      {/* <SearchInput /> */}
      <div className="mb-4">
        <h1 className={`${underdog.className} mb-4 text-center text-6xl font-bold text-white`}>
          My guest is...
        </h1>
        <p className="text-center text-white">
          Click on the guest you want to chat with, checkout their virtues, each guest has a unique
          type of conversation.
        </p>
      </div>
      <div className="mx-auto max-w-xl">
        <Carousel opts={{ loop: true }} className="w-full max-w-xl">
          <CarouselContent>
            {guests.map((guest: Guest) => (
              <CarouselItem key={guest.id} className="">
                <CardGuest guest={guest} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
