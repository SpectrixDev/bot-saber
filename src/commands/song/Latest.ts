import { MessageButton } from "discord.js";
import { getLatestSongs } from "../../api/song";
import { Run } from "../../interfaces/Command";
import { createSongEmbed } from "../../utils/song/createSongEmbed";
import { paginationEmbed } from "../../utils/paginationEmbed";

export const run: Run = async (client, commandInteraction) => {
 const songs = await getLatestSongs();

 if (!songs) return;

 const embeds = [];

 for (var song of songs) {
  const songEmbed = createSongEmbed(song);
  if (!songEmbed) return;
  embeds.push(songEmbed);
 }

 await paginationEmbed(commandInteraction, embeds);
};

export const name: string = "latest";
export const description: string = "Fetches the latest beatmaps from BeatSaver";
