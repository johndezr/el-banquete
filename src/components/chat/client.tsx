'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from '@ai-sdk/react';
import { ChatMessageProps } from './message';
import Header from './header';
import Messages from './messages';
import Form from './form';
import { Guest, Message } from '@prisma/client';
import { CardGuest } from '../card-guest';
interface ChatClientProps {
  guest: Guest & {
    messages: Message[];
    _count: { messages: number };
  };
  userImageUrl: string;
}

export default function ChatClient({ guest, userImageUrl }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(guest.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
    api: `/api/chat/${guest.id}`,
    streamProtocol: 'text',
    onFinish(prompt, completion) {
      const systemMessage: ChatMessageProps = {
        role: 'system',
        content: completion,
      };

      setMessages((current) => [...current, systemMessage]);
      setInput('');
      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input,
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="mx-auto mt-8 h-full w-full max-w-6xl">
      <div className="flex flex-row">
        <div className="basis-1/2">
          <CardGuest hideChatButton guest={guest} />
        </div>
        <div className="basis-2/3 rounded-sm border-1 border-white/40 p-4">
          <Header guest={guest} />
          <Messages
            guest={guest}
            messages={messages}
            isLoading={isLoading}
            userImageUrl={userImageUrl}
          />
          <Form
            input={input}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
