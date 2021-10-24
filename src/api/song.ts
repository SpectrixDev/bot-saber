import fetch from "node-fetch";
import { SearchResult, Song } from "../interfaces/Song";

export const getSongById = async (id: string): Promise<Song> => {
  const response = await fetch(`https://api.beatsaver.com/maps/id/${id}`);
  const song = (await response.json()) as Song;
  return song;
};

export const searchSongByName = async (name: string) => {
  const response = await fetch(
    `https://api.beatsaver.com/search/text/0?q=${name}&sortOrder=Relevance&automapper=true`
  );
  const searchResult = (await response.json()) as SearchResult;
  var songs = []
  for (let i = 0; i < (searchResult.docs.length <= 10 ? searchResult.docs.length : 10); i++) {
    songs.push(searchResult.docs[i] as Song)
  };
  return songs;
};

export const getLatestSongs = async ()=> {
  const response = await fetch(
    `https://api.beatsaver.com/maps/latest?automapper=true`
  );
  var songs = []
  const searchResult = (await response.json()) as SearchResult;
  for (let i = 0; i < 20; i++) {
    songs.push(searchResult.docs[i] as Song)
  };
  return songs;
}