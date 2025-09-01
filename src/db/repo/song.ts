import { prisma } from '@src/db/index.js';

export class SongRepo {
  static async getSongsByIdWithGenreAndArtistNames(songIds: number[]) {
    return prisma.song.findMany({
      where: {
        id: { in: songIds },
      },
      select: {
        id: true,
        genre: {
          select: { name: true, UserGenre: true },
        },
        artist: {
          select: { name: true },
        },
      },
    });
  }
}
