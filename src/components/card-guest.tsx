import type { Guest } from '@prisma/client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface CardGuestProps {
  guest: Guest;
}

export const CardGuest = ({ guest }: CardGuestProps) => {
  return (
    <section className="mt-8">
      <Link href={`/chat/${guest.id}`}>
        <Card>
          <CardHeader>
            <Image
              src={guest.imgUrl}
              alt={guest.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <CardTitle className="mt-4 text-xl font-bold">{guest.name}</CardTitle>
            <CardDescription className="mt-2 text-sm text-gray-500">
              {guest.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </section>
  );
};
