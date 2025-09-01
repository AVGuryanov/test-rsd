import { Redis } from 'ioredis';

export class Cache {
  constructor(private client: Redis, private ttlMs: number) {}

  async get<T = Record<string, unknown>>(key: string): Promise<T | null> {
    const result = await this.client.get(key);

    return result ? JSON.parse(result) : null;
  }

  async set(key: string, data: unknown) {
    return this.client.set(key, JSON.stringify(data), 'EX', this.ttlMs);
  }
}
