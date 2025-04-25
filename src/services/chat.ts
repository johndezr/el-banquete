import OpenAIService from '@/lib/open-ai';
import ReplicateService from '@/lib/replicate';
import PineconeService from '@/lib/pinecone';
import RedisService from '@/lib/redis';

const storeMessage = async (
  key: string,
  value: string,
  redisService = RedisService.getInstance()
) => {
  if (!key || !value) {
    throw new Error('Key and value are required');
  }
  try {
    await redisService.rpush(key, value);
  } catch (error) {
    throw new Error('Failed to write to Redis', { cause: error });
  }
};

const getRecentMessages = async (key: string, redisService = RedisService.getInstance()) => {
  if (!key) {
    throw new Error('Key is required');
  }
  try {
    const value = await redisService.lrange(key, -10, -1);
    return value;
  } catch (error) {
    throw new Error('Failed to read from Redis', { cause: error });
  }
};

const searchSimilarVectors = async (
  vector: number[],
  namespace: string,
  pineconeService = PineconeService.getInstance()
) => {
  try {
    const queryResult = await pineconeService.query(vector, namespace);
    return queryResult;
  } catch (error) {
    throw new Error('Failed to query Pinecone', { cause: error });
  }
};

const storeVector = async (
  key: string,
  records: number[],
  namespace: string,
  metadata: { type: string; content: string },
  pineconeService = PineconeService.getInstance()
) => {
  try {
    await pineconeService.upsert(key, records, namespace, metadata);
  } catch (error) {
    throw new Error('Failed to upsert Pinecone', { cause: error });
  }
};

const createEmbedding = async (input: string, openaiService = OpenAIService.getInstance()) => {
  try {
    const embedding = await openaiService.embed(input);
    return embedding;
  } catch (error) {
    throw new Error('Failed to embed text', { cause: error });
  }
};

const generateAIResponse = async (
  prompt: string,
  systemPrompt: string,
  replicateService = ReplicateService.getInstance()
) => {
  try {
    const response = await replicateService.generateText(prompt, systemPrompt);
    return response;
  } catch (error) {
    throw new Error('Failed to generate AI response', { cause: error });
  }
};

export {
  storeMessage,
  getRecentMessages,
  searchSimilarVectors,
  storeVector,
  createEmbedding,
  generateAIResponse,
};
