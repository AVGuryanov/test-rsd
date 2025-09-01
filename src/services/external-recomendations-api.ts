import { ExternalRecomendationApi } from '@src/modules/external-recomendations-api/index.js';
import redis from '@src/redis.js';
import {
  EXTERNAL_RECOMENDATIONS_SERVICES_URL,
  SONGS_SCORE_CACHE_TTL_MS,
} from '@src/constants/index.js';

export const externalRecomendationApi = new ExternalRecomendationApi({
  cacheClient: redis,
  baseUrl: EXTERNAL_RECOMENDATIONS_SERVICES_URL,
  cacheTTLMs: SONGS_SCORE_CACHE_TTL_MS,
});
