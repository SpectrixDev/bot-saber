import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
} from "discord.js";
import { getSongById } from "../../api/beatSaver";
import { Run } from "../../interfaces/Command";

export const run: Run = async (_client, commandInteraction, options) => {
  const subcommand = options.getSubcommand();
  if (subcommand === "id") {
    // const data = getSongById(subcommand.);
  }
};

export const name: string = "song";
export const description: string = "Get info on a song/beatmap";
export const subcommands: ApplicationCommandSubCommandData[] = [
  {
    type: "SUB_COMMAND",
    name: "id",
    description: "Get song info via its ID.",
    required: true,
    options: [
      {
        type: "INTEGER",
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
    required: true,
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
