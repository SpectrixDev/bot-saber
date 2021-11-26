import { MessageEmbed } from "discord.js";
import { BSClient } from "../../client/Client";
import { Profile } from "../../interfaces/Profile";

export const createProfileEmbed = (
  data: Profile,
  client: BSClient
): MessageEmbed | undefined => {
  const { playerInfo, scoreStats } = data;
  const embed = new MessageEmbed()
    .setTitle(`**Profile:** ${playerInfo.playerName}`)
    .setColor("#0000ff")
    .setURL(`https://scoresaber.com/u/${playerInfo.playerId}`)
    .setThumbnail(`https://new.scoresaber.com${playerInfo.avatar}`)
    .setFooter(`🔑 ID: ${playerInfo.playerId}`, client.logo);

  embed.addFields([
    {
      name: ":information_source: __Player Info__",
      value:
        `• **Rank:** #${new Intl.NumberFormat().format(playerInfo.rank)}\n` +
        `• **Country Rank:** #${new Intl.NumberFormat().format(
          playerInfo.countryRank
        )} (${playerInfo.country
        } :flag_${playerInfo.country.toLowerCase()}:)\n` +
        `• **PP:** ${new Intl.NumberFormat().format(
          Math.round(playerInfo.pp)
        )}\n`,
      inline: false,
    },
    {
      name: "📈 __Player Stats__",
      value:
        `• **Total Score:** ${new Intl.NumberFormat().format(
          scoreStats.totalScore
        )}\n` +
        `• **Total Ranked Score:** ${new Intl.NumberFormat().format(
          scoreStats.totalRankedScore
        )}\n` +
        `• **Average Ranked Accuracy:** ${new Intl.NumberFormat("en-US", {
          style: "percent",
        }).format(
          Math.round(scoreStats.averageRankedAccuracy * 100) / 100
        )})\n` +
        `• **Total Play Count:** ${new Intl.NumberFormat().format(
          scoreStats.totalPlayCount
        )}\n` +
        `• **Ranked Play Count:** ${new Intl.NumberFormat().format(
          scoreStats.rankedPlayCount
        )}\n`,
      inline: false,
    },
  ]);

  return embed;
};
