import { Redis } from 'ioredis';

export interface IExternalRecomendationApiParams {
  baseUrl: string;
  cacheClient: Redis;
  cacheTTLMs: number;
}