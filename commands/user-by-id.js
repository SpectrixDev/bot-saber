const Discord = require("discord.js");
const rp = require("request-promise");

module.exports = {
  name: "user-by-id",
  aliases: ["id"],
  description:
    "Returns the user profile from scoresaber, using the steam or scoresaber ID.",
  args: true,
  usage: "b!user-by-id <Scoresaber ID>",

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
      .then((res) => {
        const { playerInfo } = res.data;
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

        msg.channel.send(dataEmbed);
      })
      .catch((err) => {
        console.log(error);
      });
  },
};
