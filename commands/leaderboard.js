var axios = require("axios");

module.exports = {
  name: "leaderboard",
  aliases: ["leaders", "lb"],
  description: "Current scoresaber global leaderboards.",
  usage: "b!leaderboard",
  async execute(msg, args) {
    msg.channel.startTyping();
    var config = {
      method: "get",
      url: "http://new.scoresaber.com/api/players/1",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BeatSaberDiscordBot",
      },
    };

    axios(config)
      .then((res) => {
        console.log(res.data)

        msg.channel.stopTyping();
      })
      .catch((res) => {
        console.log(err);
        msg.channel.send(
          "❌ There was an error trying to execute that command!"
        );
        msg.channel.stopTyping();
      })
  }
}