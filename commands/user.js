const Discord = require("discord.js");
const rp = require("request-promise");

module.exports = {
  name: "user",
  description: "Returns the user profile from scoresaber,",
  args: true,
  usage: "b!user <Scoresaber ID>",

  async execute(msg, args) { // for args, the id can be a steam id, so we need to maybe make a search feature where you can put steam username and get steam ID numbers
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://new.scoresaber.com/api/player/${args[0]}/full`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        const { playerInfo } = response.data;
        const { playerId, playerName, avatar, rank, countryRank, pp, country } =
          playerInfo;
        const dataEmbed = new Discord.MessageEmbed()
          .setColor("#309eff")
          .setTitle(`**User:** ${playerName}`)
          .setURL(`https://new.scoresaber.com/u/${playerId}`)
          .setAuthor("Beat Saber Bot")
          .setDescription(
            `**Rank:** ${rank}\n` +
              `**Country Rank:** ${countryRank}\n` +
              `**PP:** ${pp}\n` +
              `**Country:** ${country}`,
          )
          .setThumbnail(`https://new.scoresaber.com${avatar}`);

        console.log(JSON.stringify(response.data));
        msg.channel.send(dataEmbed);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
