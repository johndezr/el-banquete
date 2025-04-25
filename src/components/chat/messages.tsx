'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Guest } from '@prisma/client';

import ChatMessage, { ChatMessageProps } from '@/components/chat/message';
interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  guest: Guest;
  userImageUrl: string;
}

export default function ChatMessages({
  guest,
  isLoading,
  messages,
  userImageUrl,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="mt-4 h-[500px] flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={guest.imgUrl}
        role="system"
        content={`Hello, I'm ${guest.name}, ${guest.description}.`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={guest.imgUrl}
          userImage={userImageUrl}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={guest.imgUrl} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}
