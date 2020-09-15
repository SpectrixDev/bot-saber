const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "hot",
  aliases: ["hotsongs"],
  description: "Returns a list of currently hot songs",
  usage: "b!hot",
  args: true,
  async execute(msg, args) {
    msg.channel.startTyping();
    var config = {
      method: "get",
      url: "https://beatsaver.com/api/maps/hot/0",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BeatSaberDiscordBot",
      },
    };

    axios(config)
      .then(function (response) {
        const {
          metadata,
          key,
          name,
          coverURL,
        } = response.data.docs[0];
        const {
          levelAuthorName,
        } = metadata;

        console.log(config.url);
      })
      .catch(function (error) {
        console.log(error);
        msg.channel.send(
          "❌ There was an error trying to execute that command! Perhaps that map doesn't exist? <:thronking:503200655507456003>",
        );
        msg.channel.stopTyping(); 
      });
  }
}

function generateFields(input) {
  for (i =0; i < 10; i++) {
    var data = [];

    
  }
}