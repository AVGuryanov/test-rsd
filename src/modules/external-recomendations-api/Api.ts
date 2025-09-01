import { IRecommendation } from './types/index.js';

export class Api {
  constructor(private baseUrl: string) {}

  async send<T = unknown>(url: string, method: string, params: Record<string, unknown> = {}) {
    const response = await fetch(url, { method, ...params });
    const data = await response.json();

    if (!response.ok) throw { status: response.status, data };

    return data as T;
  } 

  async getSongsScoreList(userId: number) {
    return this.send<IRecommendation[]>(`${this.baseUrl}?user_id=${userId}`, 'GET');
  }
}
