'use client';

import React from 'react';
import { BeatLoader } from 'react-spinners';
import { Copy } from 'lucide-react';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface ChatMessageProps {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
  userImage?: string;
}

export default function ChatMessage({
  role,
  content,
  isLoading,
  src,
  userImage,
}: ChatMessageProps) {
  const onCopy = () => {
    if (!content) return;

    navigator.clipboard.writeText(content);
    toast.success('Message Copied to Clipboard.');
  };

  return (
    <div
      data-testid="message-container"
      className={cn('group flex w-full items-start gap-x-3 py-4', role === 'user' && 'justify-end')}
    >
      {role !== 'user' && src && (
        <Avatar data-testid="guest-avatar">
          <AvatarImage src={src} />
        </Avatar>
      )}
      <div className="max-w-sm rounded-md bg-white px-4 py-2 text-sm">
        {isLoading ? <BeatLoader data-testid="loading-spinner" size={5} color="black" /> : content}
      </div>
      {role === 'user' && (
        <Avatar data-testid="user-avatar">
          <AvatarImage src={userImage} />
        </Avatar>
      )}
      {role !== 'user' && (
        <Button
          className="opacity-0 transition group-hover:opacity-100"
          onClick={onCopy}
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
