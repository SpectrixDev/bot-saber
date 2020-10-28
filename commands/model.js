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

// incomplete 
