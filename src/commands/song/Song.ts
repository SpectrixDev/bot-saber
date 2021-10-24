import { ApplicationCommandOptionData } from "discord.js";
import { getSongById, searchSongByName } from "../../api/beatSaver";
import { Run } from "../../interfaces/Command";
import { createSongEmbed } from "../../utils/song/createSongEmbed";

export const run: Run = async (client, commandInteraction, options) => {
  const subcommand = options.getSubcommand();
  if (subcommand === "id") {
    const value = options.getString("value");
    if (!value) {
      return;
    }
    const song = await getSongById(value);

    const embed = createSongEmbed(song, client);
    if (!embed) return;

    await commandInteraction.reply({ embeds: [embed] });
  }

  if (subcommand === "name") {
    const value = options.getString("value");
    if (!value) {
      return;
    }
    const song = await searchSongByName(value);

    const embed = createSongEmbed(song, client);
    if (!embed) return;

    await commandInteraction.reply({ embeds: [embed] });
  }
};

export const name: string = "song";
export const description: string = "Get info on a song/beatmap";
export const options: ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "id",
    description: "Get song info via its ID.",
    options: [
      {
        type: "STRING",
        name: "value",
        description: "Value to get song info from.",
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
        name: "value",
        description: "Value to get song info from.",
        required: true,
      },
    ],
  },
];
