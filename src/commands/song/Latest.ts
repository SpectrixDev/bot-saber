import { ApplicationCommandOptionData } from "discord.js";
import { getLatestSongs, getSongById, searchSongByName } from "../../api/song";
import { Run } from "../../interfaces/Command";
import { createSongEmbed } from "../../utils/song/createSongEmbed";

export const run: Run = async (client, commandInteraction) => {

    const songs = await getLatestSongs();

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
};

export const name: string = "latest";
export const description: string =
  "Fetches the latest beatmaps from BeatSaver";
