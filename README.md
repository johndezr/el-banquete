# The Symposium: AI Chat Companion with RAG

![Chat Interface](https://res.cloudinary.com/dgkjzoae8/image/upload/v1745604752/chat-page_o788ok.png)

## 📌 Project Description

I built an AI chat companion inspired by Plato's Symposium for philosophy enthusiasts to engage in meaningful conversations about love, wisdom, and human nature. The system leverages Retrieval-Augmented Generation (RAG) to provide personalized and context-aware conversations, integrating Replicate for AI model inference, Pinecone for conversation memory and context storage, and Redis for real-time chat state management and caching.

## 🔄 How It Works

### 1. User Authentication & Session Management

- Users authenticate via Clerk.js
- Session data is stored in Redis for real-time state management
- User preferences and history are persisted in Supabase

### 2. Conversation Flow

1. **Message Reception**

   - User sends a message through the chat interface
   - Message is temporarily stored in Redis for real-time updates
   - Message is processed for context retrieval

2. **Context Retrieval (RAG Pipeline)**

   - Message is converted to embeddings using OpenAI's API
   - Pinecone performs semantic search to find relevant conversation context
   - Top-k most relevant context is retrieved based on similarity scores

3. **AI Response Generation**

   - Retrieved context is combined with the user's message
   - llama-2-7b-chat model processes the enriched prompt
   - Response is generated with context-aware insights

4. **Response Processing**
   - Generated response is streamed back to the user
   - Conversation context is updated in Pinecone
   - Message history is stored in Supabase for persistence

### 3. Technical Architecture

```ascii
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │     │   Server    │     │   Storage   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ Next.js App │     │ API Routes  │     │  Supabase   │
│ Clerk Auth  │◄───►│ Replicate   │◄───►│  Pinecone   │
│ Real-time UI│     │ OpenAI API  │     │   Redis     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## ⚒️ Tech Stack

- **Framework**: React + Next.js
- **Data Fetching**: Fetch
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn
- **ORM**: Prisma
- **AI & Storage**:
  - OpenAI API
  - llama-2-7b-chat
  - Replicate (AI model inference)
  - Pinecone (conversation memory & context)
  - Redis (real-time state & caching)
  - Supabase (permanent storage)
- **Test**:
  - Vitest
  - Testing Library
- **Auth**:
  - Clerk.js

## 📦 Integration with AI Services

The project integrates three main external services:

1. **Replicate**: Handles AI chat interactions

   - Message processing
   - Context-aware responses
   - Streaming chat updates

2. **Pinecone**: Manages conversation memory and context

   - Chat history storage
   - Context retrieval
   - Conversation vectorization

## Approach

1. Created a High-Level Design System
2. Designed chat interface mockups
3. Integrated AI services
4. Implemented RAG pipeline for context-aware responses
5. Developed real-time chat components

## High-Level Design System

### Functional Requirements

- Real-time chat interface
- Context-aware responses
- Conversation history management
- Session persistence
- Rate limiting and moderation

## Interface Definition (API)

Required HTTP APIs:

- **Chat**:

  - Send messages
  - Stream responses
  - Manage conversation context

- **Conversations**:

  - List conversations
  - Retrieve conversation history

## Optimizations and Deep Dive

- **Performance Optimizations**:

  - Optimize message streaming
  - Efficient context retrieval
  - Real-time updates

## Things to Improve

1. Implement advanced conversation context management
2. Add support for multimedia messages

## What's Next

1. Implement voice chat capabilities
2. Add support for group conversations
3. Delete conversations
4. Upload more characters
5. Upload to vercel
6. Create the API services with FastAPI
