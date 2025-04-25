import type { Guest } from '@prisma/client';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CardGuestProps {
  guest: Guest;
  hideChatButton?: boolean;
}

export const CardGuest = ({ guest, hideChatButton = false }: CardGuestProps) => {
  return (
    <Card data-testid="guest-card" className="mx-2 border-none bg-transparent text-white">
      <CardHeader className="p-0">
        <Image src={guest.imgUrl} alt={guest.name} width={200} height={200} className="mx-auto" />
      </CardHeader>
      <CardContent className="mx-auto text-center">
        <CardTitle className="text-center text-2xl font-bold">{guest.name}</CardTitle>
        <CardDescription className="mt-2 text-center text-white">
          {guest.description}
        </CardDescription>
        <div className="mt-4 flex justify-center">
          {guest.virtues.map((virtue, id) => (
            <Badge key={id} variant="outline" className="mr-2 text-white">
              {virtue}
            </Badge>
          ))}
        </div>
        {!hideChatButton && (
          <Link href={`/chat/${guest.id}`} className="mt-4 font-bold">
            <Button data-testid="chat-button" variant="secondary" className="mt-4 w-xs font-bold">
              Start chatting
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
