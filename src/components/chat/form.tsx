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
    <form
      data-testid="chat-form"
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-white/40 py-4"
    >
      <Input
        data-testid="chat-input"
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-white"
      />
      <Button disabled={isLoading} variant="ghost" data-testid="chat-send-button">
        <SendHorizonal className="h-6 w-6 text-white" />
      </Button>
    </form>
  );
}
