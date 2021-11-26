import { ApplicationCommandOptionData } from "discord.js";
import { getSongById, searchSongByName } from "../../api/song";
import { Run } from "../../interfaces/Command";
import { paginationEmbed } from "../../utils/paginationEmbed";
import { createSongEmbed } from "../../utils/song/createSongEmbed";

export const run: Run = async (client, commandInteraction, options) => {
 const subcommand = options.getSubcommand();
 if (subcommand === "id") {
  const search = options.getString("search");
  if (!search) {
   return;
  }
  const song = await getSongById(search);

  const embed = createSongEmbed(song);
  if (!embed) return;

  await commandInteraction.reply({ embeds: [embed] });
 }

 if (subcommand === "name") {
  const search = options.getString("search");
  if (!search) {
   return;
  }
  const songs = await searchSongByName(search);

  if (!songs) return;

  const embeds = [];

  for (var song of songs) {
   const songEmbed = createSongEmbed(song);
   if (!songEmbed) return;
   embeds.push(songEmbed);
  }

  await paginationEmbed(commandInteraction, embeds);
 }
};

export const name: string = "song";
export const description: string = "Get info on a song/beatmap on BeatSaver.";
export const options: ApplicationCommandOptionData[] = [
 {
  type: "SUB_COMMAND",
  name: "id",
  description: "Get song info via its ID.",
  options: [
   {
    type: "STRING",
    name: "search",
    description: "Search term to get song info from.",
    required: true,
   },
  ],
 },
 {
  type: "SUB_COMMAND",
  name: "name",
  description: "Get song info via its name.",
  options: [
   {
    type: "STRING",
    name: "search",
    description: "Search term to get song info from.",
    required: true,
   },
  ],
 },
];
