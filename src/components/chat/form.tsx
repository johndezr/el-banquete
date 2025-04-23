'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';
import { SendHorizonal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatFormProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

export default function ChatForm({ handleInputChange, input, isLoading, onSubmit }: ChatFormProps) {
  return (
    <form onSubmit={onSubmit} className="border-primary/10 flex items-center gap-x-2 border-t py-4">
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="bg-primary/10 rounded-lg"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
}
