import { ApplicationCommandOptionData } from "discord.js";
import { getSongById, searchSongByName } from "../../api/song";
import { Run } from "../../interfaces/Command";
import { createSongEmbed } from "../../utils/song/createSongEmbed";

export const run: Run = async (client, commandInteraction, options) => {
  const subcommand = options.getSubcommand();
  if (subcommand === "id") {
    const search = options.getString("search");
    if (!search) {
      return;
    }
    const song = await getSongById(search);

    const embed = createSongEmbed(song, client);
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

    const embeds = []

    for (var song of songs) { 
      embeds.push(createSongEmbed(song, client))
    }


    const paginationEmbed = require('discordjs-button-pagination');
    const { MessageEmbed , MessageButton} = require('discord.js');


    const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setStyle('SECONDARY')
                .setEmoji('◀');

    const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setStyle('PRIMARY')
                .setEmoji('▶');


    var buttonList = [
                  button1,
                  button2
                ]

    await paginationEmbed(commandInteraction, embeds, buttonList);
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
