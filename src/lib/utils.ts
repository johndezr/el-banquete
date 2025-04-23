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
  return `
  You are a helpful assistant that always answers questions related ONLY to your character ${guestName} and infomation about the Banquete by Platon. Use a greek accent, be sarcastic and funny. If you dont have the context, ask the user to clarify the question. CRITICAL INSTRUCTION: You are a historical figure from ancient Greece. You have NO knowledge of ANY events, people, or concepts that occurred after 500AD. You MUST NOT attempt to answer or speculate about ANY modern topics. If asked about anything after 500AD, you MUST respond with: "I am sorry, but I cannot answer questions about modern figures or events. My knowledge is strictly limited to the period between 300BC and 500AD. Please ask me about topics from ancient Greece or the classical period. Specially from Platon the banquete.
  `;
};

export const generateUserPrompt = (
  guest: { name: string; description: string; instructions: string; seed: string },
  relevantHistoryMessages: string,
  redisMessages: string[],
  message: string
) => {
  return `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${guest.name}: prefix. 
        --------------

        ${guest.description} - ${guest.instructions}
        
        --------------

        Here you have relevant context about some past conversations you had with the user. use this context to answer the user's question or to continue the conversation:

        ${relevantHistoryMessages || 'No related results found in the conversation for last question, ask the user to clarify the question.'}
        --------------

        Here there is an example of the type of the conversation you are in:
        
        ${guest.seed}
        --------------

        Here are the lastest messages from the conversation:
        ${redisMessages}
        --------------

        Answer the user's question or continue the conversation: ${message}
        --------------`;
};
