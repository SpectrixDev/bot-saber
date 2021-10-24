import { ApplicationCommandOptionData } from "discord.js";
import { Run } from "../../interfaces/Command";

export const run: Run = async (_client, commandInteraction, _options) => {
  commandInteraction.reply("Pong!");
};

export const name: string = "profile";
export const description: string =
  "Search and get the info of any profile on ScoreSaber.";
export const options: ApplicationCommandOptionData[] = [
  {
    type: "SUB_COMMAND",
    name: "id",
    description: "Get profile info via its ID.",
    options: [
      {
        type: "STRING",
        name: "search",
        description: "Search term to get profile info from.",
        required: true,
      },
    ],
  },
  {
    type: "SUB_COMMAND",
    name: "name",
    description: "Get profile info via its name.",
    options: [
      {
        type: "STRING",
        name: "search",
        description: "Search term to get profile info from.",
        required: true,
      },
    ],
  },
];
