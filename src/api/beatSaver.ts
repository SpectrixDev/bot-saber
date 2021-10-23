import fetch from "node-fetch";
import { SearchResult, Song } from "../interfaces/Song";

export const getSongById = async (id: string): Promise<Song> => {
  const response = await fetch(`https://api.beatsaver.com/maps/id/${id}`);
  const song = (await response.json()) as Song;
  return song;
};

export const searchSongByName = async (name: string): Promise<Song> => {
  const response = await fetch(
    `https://api.beatsaver.com/search/text/0?q=${name}&sortOrder=Relevance&automapper=true`
  );
  const searchResult = (await response.json()) as SearchResult;
  return searchResult.docs[0] as Song;
};
