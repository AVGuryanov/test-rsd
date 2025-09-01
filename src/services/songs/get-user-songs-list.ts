import { SongRepo } from '@src/db/repo/song.js';

import { externalRecomendationApi } from '../external-recomendations-api.js';

import { ISong } from '@src/types/response.js'

const SCORE_FLAG = 0.6;

enum SONG_LABEL {
  perf = 'perfect_match',
  good = 'good_match',
};

const SORTING_LABEL_SORTING = {
  [SONG_LABEL.perf]: 2,
  [SONG_LABEL.good]: 1,
};

export const getUserSongsList = async (userId: number): Promise<ISong[]> => {
  const userSongsList = await externalRecomendationApi.getSongsScoreList(userId);
  const songs = await SongRepo.getSongsByIdWithGenreAndArtistNames(userSongsList.map(song => song.songId));

  const result = songs.map(({ id, genre, artist }) => {
    const songScore = userSongsList.find(item => item.songId === id)!;

    let label: SONG_LABEL | null = null;

    const isSongWithUserFavoriteGenre = genre.UserGenre.some(genre => genre.userId === userId);
    const isSongScoreMoreThanFlag = songScore?.score > SCORE_FLAG;

    if (isSongWithUserFavoriteGenre && isSongScoreMoreThanFlag) {
      label = SONG_LABEL.perf;
    } else if (isSongWithUserFavoriteGenre || isSongScoreMoreThanFlag) {
      label = SONG_LABEL.good;
    }

    return {
      id,
      genre: { name: genre.name },
      artist,
      label,
    };
  });

  return result.sort((prev, next) => {
    const prevLabelSort = prev.label && SORTING_LABEL_SORTING[prev.label] || 0;
    const nextLabelSort = next.label && SORTING_LABEL_SORTING[next.label] || 0;

    return nextLabelSort - prevLabelSort;
  });
}
