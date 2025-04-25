import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prisma';
import Client from '@/components/chat/client';

interface ChatIdPageProps {
  params: { chatId: string };
}

export default async function ChatPage({ params }: ChatIdPageProps) {
  const user = await currentUser();
  const { chatId } = await params;

  if (!user) return redirect('/');

  const guest = await prismadb.guest.findUnique({
    where: { id: chatId },
    include: {
      messages: { orderBy: { createdAt: 'asc' }, where: { userId: user.id } },
      _count: { select: { messages: true } },
    },
  });

  if (!guest) return redirect('/');

  return <Client guest={guest} userImageUrl={user.hasImage ? user.imageUrl : ''} />;
}
