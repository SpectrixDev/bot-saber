import { ApplicationCommandOptionData } from "discord.js";
import { getProfileById, searchProfileByName } from "../../api/profile";
import { Run } from "../../interfaces/Command";
import { paginationEmbed } from "../../utils/paginationEmbed";
import { createProfileEmbed } from "../../utils/profile/createProfileEmbed";

export const run: Run = async (client, commandInteraction, options) => {
  const subcommand = options.getSubcommand();
  if (subcommand === "id") {
    const search = options.getString("search");
    if (!search) {
      return;
    }
    const profile = await getProfileById(search);

    const embed = createProfileEmbed(profile, client);
    if (!embed) return;

    await commandInteraction.reply({ embeds: [embed] });
  }

  if (subcommand === "name") {
    const search = options.getString("search");
    if (!search) {
      return;
    }
    const profiles = await searchProfileByName(search);

    if (!profiles) return;

    const embeds = [];

    for (let profile of profiles) {
      const profileEmbed = createProfileEmbed(profile, client);
      if (!profileEmbed) return;
      embeds.push(profileEmbed);
    }

    await paginationEmbed(commandInteraction, embeds);
  }
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
