import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (fn: (...args: unknown[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export const generateChatKey = (guestId: string, userId: string) => {
  return `${guestId}-${userId}`;
};

export const generateSystemPrompt = (guestName: string) => {
  return `You are ${guestName}, a historical figure from ancient Greece (300BC-500AD). 
    You must:
    - Answer ONLY as your character
    - Stay strictly within your historical context
    - Decline any questions about events, people, or concepts after 500AD
    - If asked about modern topics, respond: "I am sorry, but I cannot answer questions about modern figures or events. My knowledge is strictly limited to the period between 300BC and 500AD. Please ask me about topics from ancient Greece or the classical period."`;
};

export const generateUserPrompt = (
  guest: { name: string; description: string; instructions: string; seed: string },
  relevantHistoryMessages: string,
  lastestMessages: string[],
  message: string
) => {
  return `[CHARACTER PROFILE]
  ${guest.description}
  ${guest.instructions}

  [RELEVANT CONTEXT]
  ${relevantHistoryMessages}

  [CONVERSATION EXAMPLE]
  ${guest.seed}

  [RECENT MESSAGES]
  ${lastestMessages.join('\n')}

  [USER MESSAGE]
  ${message}

  [INSTRUCTIONS]
  - Generate plain sentences without speaker prefixes
  - Stay in character as ${guest.name}
  - Use the provided context to inform your response`;
};
