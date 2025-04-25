import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  storeMessage,
  getRecentMessages,
  createEmbedding,
  generateAIResponse,
} from '../../services/chat';
import RedisService from '@/lib/redis';
import OpenAIService from '@/lib/open-ai';
import ReplicateService from '@/lib/replicate';

const rpushMock = vi.fn();
const lrangeMock = vi.fn();

vi.mock('@/lib/redis', () => ({
  default: {
    getInstance: vi.fn(() => ({
      rpush: rpushMock,
      lrange: lrangeMock,
    })),
  },
}));

const embedMock = vi.fn();
vi.mock('@/lib/open-ai', () => ({
  default: {
    getInstance: vi.fn(() => ({
      embed: embedMock,
    })),
  },
}));

const generateTextMock = vi.fn();
vi.mock('@/lib/replicate', () => ({
  default: {
    getInstance: vi.fn(() => ({
      generateText: generateTextMock,
    })),
  },
}));

describe('Chat Service', () => {
  const mockRedisService = RedisService.getInstance();
  const mockOpenAIService = OpenAIService.getInstance();
  const mockReplicateService = ReplicateService.getInstance();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('storeMessage', () => {
    it('should store a message successfully', async () => {
      const key = 'test-key';
      const value = 'test message';

      vi.mocked(mockRedisService.rpush).mockResolvedValueOnce(undefined);

      await storeMessage(key, value);

      expect(rpushMock).toHaveBeenCalledWith(key, value);
    });

    it('should throw error when key or value is missing', async () => {
      const key = '';
      const value = '';

      await expect(storeMessage(key, value)).rejects.toThrow('Key and value are required');
    });
  });

  describe('getRecentMessages', () => {
    it('should retrieve recent messages successfully', async () => {
      const key = 'test-key';
      const mockMessages = ['message1', 'message2'];
      vi.mocked(mockRedisService.lrange).mockResolvedValueOnce(mockMessages);

      const result = await getRecentMessages(key);

      expect(result).toEqual(mockMessages);
      expect(lrangeMock).toHaveBeenCalledWith(key, -10, -1);
    });

    it('should throw error when key is missing', async () => {
      const key = '';

      await expect(getRecentMessages(key)).rejects.toThrow('Key is required');
    });
  });

  describe('createEmbedding', () => {
    it('should create embedding successfully', async () => {
      const input = 'test input';
      const mockEmbedding = [0.1, 0.2, 0.3];
      vi.mocked(mockOpenAIService.embed).mockResolvedValueOnce(mockEmbedding);

      const result = await createEmbedding(input);

      expect(result).toEqual(mockEmbedding);
      expect(embedMock).toHaveBeenCalledWith(input);
    });
  });

  describe('generateAIResponse', () => {
    it('should generate AI response successfully', async () => {
      const prompt = 'test prompt';
      const systemPrompt = 'test system prompt';
      const mockResponse = ['AI response'];

      vi.mocked(mockReplicateService.generateText).mockResolvedValueOnce(mockResponse);

      await generateAIResponse(prompt, systemPrompt);

      expect(generateTextMock).toHaveBeenCalledWith(prompt, systemPrompt);
    });
  });
});
