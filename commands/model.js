const axios = require("axios");
const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');

module.exports = {
    name: "model",
    description: "Gets Avatars, Sabers, Platforms, and Bloqs from ModelSaber. For example, b!model avatar tag funny",
    args: true,
    aliases: ["modelsaber", "models"],
    usage: "b!model <type (avatar, saber, platform, bloq)> <name>",
    async execute(msg, args) {
      msg.channel.startTyping();
      var config = {
        method: "get",
        url: `https://modelsaber.com/api/v2/get.php?sortDirection=asc&type=${args[0]}&filter=name:${args[1]}`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BeatSaberDiscordBot",
        },
      };
      const pages = Object.keys(config[i]).length
      const embeds = [];

      for (let i = 0; i <= pages; ++i) {
        axios(config)
        .then(function (response) {
          const {
            type,
            name,
            thumbnail,
            download,
          } = data;
        embeds.push(new Discord.MessageEmbed().addFields({name='Page', value=i+1},{name='Type', value=type},{name='Name', value=name}))
      
      
      new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(i+1)
         // Methods below are for customising all embeds
        .setTitle('Test Title')
        .setDescription('Test Description')
        .setFooter('Test Footer Text')
        .setURL(download)
        .setColor(0xFF00AE)
        .addField('\u200b', '\u200b')
        .addField('Test Field 1', 'Test Field 1', true)
        .addField('Test Field 2', 'Test Field 2', true)
        .build();
        });
      }
    }
  }
  

// incomplete 
