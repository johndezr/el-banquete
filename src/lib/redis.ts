import { Redis } from '@upstash/redis';

interface IRedisService {
  lpush(key: string, value: string): Promise<void>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  rpush(key: string, value: string): Promise<void>;
}

class RedisService implements IRedisService {
  private static instance: RedisService;
  private redis: Redis;

  private constructor() {
    this.redis = Redis.fromEnv();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async lpush(key: string, value: string): Promise<void> {
    await this.redis.lpush(key, value);
  }

  public async rpush(key: string, value: string): Promise<void> {
    await this.redis.rpush(key, value);
  }

  public async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.redis.lrange(key, start, stop);
  }
}

export type { IRedisService };
export default RedisService;
