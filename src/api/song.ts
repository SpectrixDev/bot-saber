import fetch from "node-fetch";
import { SearchResult, Song } from "../interfaces/Song";

export const getSongById = async (id: string): Promise<Song> => {
  const response = await fetch(`https://api.beatsaver.com/maps/id/${id}`);
  const song = (await response.json()) as Song;
  return song;
};

export const searchSongByName = async (name: string): Promise<Song[]> => {
  const response = await fetch(
    `https://api.beatsaver.com/search/text/0?q=${name}&sortOrder=Relevance&automapper=true`
  );
  const result = (await response.json()) as SearchResult;
  var songs = [];
  for (
    let i = 0;
    i < (result.docs.length <= 10 ? result.docs.length : 10);
    i++
  ) {
    songs.push(result.docs[i] as Song);
  }
  return songs;
};

export const getLatestSongs = async (): Promise<Song[]> => {
  const response = await fetch(
    `https://api.beatsaver.com/maps/latest?automapper=true`
  );
  const result = (await response.json()) as SearchResult;
  let songs = [];
  for (let i = 0; i < 20; i++) {
    songs.push(result.docs[i]);
  }
  return songs;
};
