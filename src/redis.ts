import { Redis } from 'ioredis';
import { REDIS_URL } from '@src/constants/index.js';

const client = new Redis(REDIS_URL);

export default client;
