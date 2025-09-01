export const REDIS_URL = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

export const EXTERNAL_RECOMENDATIONS_SERVICES_URL = `http://localhost:${process.env.PORT}/api/external-recommendations`;

export const SONGS_SCORE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
