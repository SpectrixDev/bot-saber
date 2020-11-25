const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "song",
  aliases: ["map", "beatmap"],
  description: "Gets info about a beatmap via it's name.",
  usage: "b!song <name-of-song>",
  args: true,
  async execute(msg, args) {
    msg.channel.startTyping()
    if (args[0].toLowerCase() == "key") {
      msg.channel.send(await getSongByKey(args[1]));
    } else if (args[0] == "name") {
      msg.channel.send(await getSongByName(args[1]));
      } else {
        msg.channel.send("No search type specified, defaulting to \"name\".");
        msg.channel.send(await getSongByName(args[0]));
      }
    msg.channel.stopTyping();
    }
  };
  
async function getSongByKey(mapKey) {
  const config = {
    method: "get",
    url: `https://beatsaver.com/api/maps/detail/${mapID}`,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "BeatSaberDiscordBot",
    },
  };
  
    let returnedEmbed;

    axios(config)
      .then(function (response) {
        const {
          metadata,
          stats,
          key,
          name,
          coverURL,
        } = response.data.docs[0];
        const {
          difficulties,
          duration,
          levelAuthorName,
          bpm,
        } = metadata;
        const {
          downloads,
          downVotes,
          upVotes,
          rating,
        } = stats;
        const {
          easy,
          normal,
          hard,
          expert,
          expertPlus,
        } = difficulties;

        var difficultylist = "";
        for (var i in difficulties) { // Needs to be alphabetical I think, if anyone knows how feel free to contribute
          if (difficulties[i] == true && difficulties.hasOwnProperty(i)) {
            difficultylist += `- ${i.charAt(0).toUpperCase() + i.slice(1)}\n`;
          }
        }

        const mapEmbed = new Discord.MessageEmbed()
          .setColor("#f03030")
          .setTitle(`**Beatmap:** ${name}`)
          .setURL(`https://beatsaver.com/beatmap/${key}`)
          .setDescription(
            `📥 [One click install](http://spectrix.pythonanywhere.com/botsaber?key=${key}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!
            👀 [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id=${key}) `
          )
          .addFields(
            {
              name: "ℹ __Beatmap Info__",
              value: (
                `• **Level Author:** ${aiOrNo(levelAuthorName)}\n` +
                `• **Duration:** ${durationCheck(duration)}\n` +
                `• **Beatmap BPM:** ${Math.round(
                  (bpm + Number.EPSILON) * 100,
                ) / 100}`
              ),
            },
            {
              name: "📈 __Beatmap Stats__",
              value: (
                `• **Downloads:** ${downloads.toLocaleString()}\n` +
                `• **Upvotes:** ${upVotes.toLocaleString()}\n` +
                `• **Downvotes:** ${downVotes.toLocaleString()}\n` +
                `• **Rating:** ${Math.round(
                  (rating * 100 + Number.EPSILON) * 100,
                ) / 100}%`
              ),
            },
            {
              name: "📊 __Beatmap Difficulties__",
              value: (
                (difficultylist)
              ),
            },
          )
          .setThumbnail(`https://beatsaver.com${coverURL}`)
          .setFooter(
            `🔑 ${key} | Data from BeatSaver.`,
            "https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png",
          );

          returnedEmbed = dataEmbed;
        }).catch((err) => {
          console.log(err);
        });
    
        return returnedEmbed;
    }

    async function getSongByName(playerName) {
      var config = {
        method: "get",
        url: `https://beatsaver.com/api/search/advanced/0?q=${
          encodeURI(args.join(" ").replace(/\\\//g, " ").replace(/\//g, " "))
        }`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BeatSaberDiscordBot",
        },
      };

      var fallbackConfig = { // Need to use this
        method: "get",
        url: `https://beatsaver.com/api/search/text/0?q=${
          encodeURI(args.join(" ").replace(/\\\//g, " ").replace(/\//g, " "))
        }`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BeatSaberDiscordBot",
        },
      };
    
      let returnedEmbed;
    
      await axios(config)
        .then(async (res) => {
          const { key } = res.data.key;
          const embedSend = await getSongByKey(key); // oof
          returnedEmbed = embedSend;
        })
        .catch(async (error) => {
            const embedSend = await getSongByKey(key);
            returnedEmbed = embedSend;
            }).catch((error) => {
                console.log(error);
                msg.channel.send(`:x: Map not found. Try the key instead?`);
                return;
        });
      returnedEmbed = embedSend;
      return returnedEmbed;
    }
    

function aiOrNo(input) {
  if (input == "Beat Sage") {
    return "Created by AI.";
  } else {
    return input;
  }
}

function pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
};

function durationCheck(input) {
  if (input == 0) {
    return "Not Specified.";
  } else {
    var minutes = Math.floor(input / 60);
    var seconds = input - minutes * 60;
    return `${minutes}:${pad_with_zeroes(seconds, 2)}`
  }
}