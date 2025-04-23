'use client';

import React from 'react';
import { Guest, Message } from '@prisma/client';
import { ChevronLeft, MessagesSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  guest: Guest & {
    messages: Message[];
    _count: { messages: number };
  };
}

export default function ChatHeader({ guest }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="border-primary/10 flex w-full items-center justify-between border-b pb-4">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Avatar>
          <AvatarImage src={guest.imgUrl} />
        </Avatar>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{guest.name}</p>
            <div className="text-muted-foreground flex items-center text-xs">
              <MessagesSquare className="mr-1 h-3 w-3" />
              {guest._count.messages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
