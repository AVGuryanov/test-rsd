import { SongRepo } from '@src/db/repo/song.js';

import { externalRecomendationApi } from '../external-recomendations-api.js';

import { ISong } from '@src/types/response.js'

const SCORE_FLAG = 0.6;

const SONG_LABELS = {
  0: null,
  1: 'good_match',
  2: 'perfect_match',
} as const;

export const getUserSongsList = async (userId: number, limit = 50, offset = 0): Promise<ISong[]> => {
  const userSongsList = await externalRecomendationApi.getSongsScoreList(userId);
  const songs = await SongRepo.getSortedByScoreSongsForUser(userId, userSongsList, SCORE_FLAG, limit, offset);

  return songs.map(song => {
    return {
      id: song.id,
      genre: { name: song.genreName },
      artist: { name: song.artistName },
      label: SONG_LABELS[song.labelPriority],
    };
  });
};
