const axios = require("axios");
const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');

module.exports = {
    name: "model",
    description: "Gets Avatars, Sabers, Platforms, and Bloqs from ModelSaber. For example, b!model avatar tag funny",
    args: true,
    aliases: ["modelsaber", "models"],
    usage: "b!model <type (avatar, saber, platform, bloq)> <filter (author, name, tag)> <keyword>",
    async execute(msg, args) {
      msg.channel.startTyping();
      var config = {
        method: "get",
        url: $`https://modelsaber.com/api/v2/get.php?sortDirection=asc&start=0&end=9&`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BeatSaberDiscordBot",
        },
      };
      const embeds = [];

      for (let i = 1; i <= 5; ++i)
        embeds.push(new Discord.MessageEmbed().addFields('Page', i)
        );
      
      const myImage = message.author.displayAvatarURL();
      
      new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
         // Methods below are for customising all embeds
        .setTitle('Test Title')
        .setDescription('Test Description')
        .setFooter('Test Footer Text')
        .setURL(myImage)
        .setColor(0xFF00AE)
        .addField('\u200b', '\u200b')
        .addField('Test Field 1', 'Test Field 1', true)
        .addField('Test Field 2', 'Test Field 2', true)
        .build();

// incomplete 
