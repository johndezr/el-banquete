'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from '@ai-sdk/react';
import { ChatMessageProps } from './message';
import Header from './header';
import Messages from './messages';
import Form from './form';
import { Guest, Message } from '@prisma/client';

interface ChatClientProps {
  guest: Guest & {
    messages: Message[];
    _count: { messages: number };
  };
}

export default function ChatClient({ guest }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(guest.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
    api: `/api/chat/${guest.id}`,
    streamProtocol: 'text',
    onResponse(response) {
      console.log('Here on response', response);
    },
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
    <div className="mx-auto h-full w-full max-w-4xl">
      <Header guest={guest} />
      <Messages guest={guest} messages={messages} isLoading={isLoading} />
      <Form
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
