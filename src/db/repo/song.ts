import { prisma } from '@src/db/index.js';

export class SongRepo {
  static async getSortedByScoreSongsForUser(
    userId: number,
    scores: { songId: number; score: number }[],
    targetScore = 0.6,
    limit = 50,
    offset = 0,
  ): Promise<{
    id: number;
    score: number;
    genreName: string;
    artistName: string;
    labelPriority: 0 | 1 | 2;
  }[]> {
    const scoreValues = scores.map(({ songId, score }) => `(${songId}, ${score})`).join(', ');

    return prisma.$queryRawUnsafe(`
      WITH songs_scores AS (
        SELECT * FROM (VALUES ${scoreValues}) AS t (song_id, score)
      )
      SELECT
        songs.id as id,
        COALESCE(songs_scores.score, 0.0) AS score,
        genres.name AS "genreName",
        artists.name AS "artistName",
        CASE
          WHEN current_user_genres.genre_id IS NOT NULL AND score > ${targetScore} THEN 2
          WHEN current_user_genres.genre_id IS NOT NULL OR score > ${targetScore} THEN 1
          ELSE 0
        END AS "labelPriority"
      FROM
        songs
      LEFT JOIN
        songs_scores ON songs.id = songs_scores.song_id
      LEFT JOIN
        artists ON songs.artist_id = artists.id
      LEFT JOIN
        genres ON songs.genre_id = genres.id
      LEFT JOIN (
        SELECT genre_id
        FROM user_genres
        WHERE user_id = ${userId}
      ) as current_user_genres
      ON genres.id = current_user_genres.genre_id
      ORDER BY "labelPriority" DESC, id DESC
      LIMIT ${limit} OFFSET ${offset};
    `);
  }
}
