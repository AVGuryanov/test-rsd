import { Api } from './Api.js';
import { Cache } from './Cache.js';

import { IExternalRecomendationApiParams, IRecommendation } from './types/index.js';

export class ExternalRecomendationApi {
  private api: Api;
  private cache: Cache;

  constructor(params: IExternalRecomendationApiParams) {
    this.api = new Api(params.baseUrl);
    this.cache = new Cache(params.cacheClient, params.cacheTTLMs);
  }

  async getSongsScoreList(userId: number) {
    const cacheKey = `songs-score-list/${userId}`;

    const cached = await this.cache.get<IRecommendation[]>(cacheKey);

    if (cached) return cached;

    const result = await this.api.getSongsScoreList(userId);

    await this.cache.set(cacheKey, result);

    return result;
  } 
}
