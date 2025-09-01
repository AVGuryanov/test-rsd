ALTER TABLE "Song" RENAME CONSTRAINT "Song_artist_id_fkey" TO "songs_artist_id_fkey";

ALTER TABLE "Song" RENAME CONSTRAINT "Song_genre_id_fkey" TO "songs_genre_id_fkey";

ALTER TABLE "songs" RENAME CONSTRAINT "Song_pkey" TO "songs_pkey";

ALTER TABLE "Song" RENAME TO "songs";
