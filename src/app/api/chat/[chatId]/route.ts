import {
  storeMessage,
  getRecentMessages,
  searchSimilarVectors,
  createEmbedding,
  generateAIResponse,
  storeVector,
} from '@/services/chat';
import { getGuestById, pushNewMessage } from '@/services/guest';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { generateSystemPrompt, generateUserPrompt } from '@/lib/utils';
import { ratelimit } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: { chatId: string } }) {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse('Unauthorized!', { status: 401 });

    const { success } = await ratelimit(user.id);

    if (!success) return new NextResponse('Rate limit exceeded!', { status: 429 });

    const { prompt: message } = await req.json();
    const { chatId } = await params;

    const guest = await getGuestById(chatId);

    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatKey = `${guest.name.toLowerCase()}-${chatId}-${user.id}`;

    await pushNewMessage(message, 'user', chatId, user.id);
    await storeMessage(chatKey, '\n User:' + message + '\n');

    const newMessageEmbedding = await createEmbedding(message);
    const similarMessages = await searchSimilarVectors(newMessageEmbedding, '');
    const relevantHistoryMessages = similarMessages.matches
      .filter((m) => m.score !== undefined && m.score >= 0.4)
      .map((m) => m.metadata?.content || '')
      .join('\n');
    const redisMessages = await getRecentMessages(chatKey);

    const systemPrompt = generateSystemPrompt(guest.name);
    const userPrompt = generateUserPrompt(
      {
        name: guest.name,
        description: guest.description,
        instructions: guest.instructions,
        seed: guest.seed,
      },
      relevantHistoryMessages,
      redisMessages,
      message
    );

    const response = await generateAIResponse(userPrompt, systemPrompt);
    const cleanedOutput = response.join('');

    await storeVector(`${Date.now()}:user-${chatKey}`, newMessageEmbedding, chatKey, {
      content: message,
      type: 'user',
    });

    await storeMessage(chatKey, '\n' + cleanedOutput + '\n');
    const embedding = await createEmbedding(cleanedOutput);

    await storeVector(`${Date.now()}:system-${chatKey}`, embedding, '', {
      content: cleanedOutput,
      type: 'system',
    });
    await pushNewMessage(cleanedOutput, 'system', chatId, user.id);

    return new Response(cleanedOutput, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
