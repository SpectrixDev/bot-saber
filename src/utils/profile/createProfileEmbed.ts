import { MessageEmbed } from "discord.js";
import { BSClient } from "../../client/Client";
import { Profile } from "../../interfaces/Profile";

export const createProfileEmbed = (
  data: Profile,
  client: BSClient
): MessageEmbed | undefined => {
  const { scoreStats } = data;
  const embed = new MessageEmbed()
    .setTitle(`**Profile:** ${data.name}`)
    .setColor("#0000ff")
    .setURL(`https://scoresaber.com/u/${data.id}`)
    .setThumbnail(data.profilePicture)
    .setFooter(`🔑 ID: ${data.id}`, client.logo);

  embed.addFields([
    {
      name: ":information_source: __Player Info__",
      value:
        `• **Rank:** #${new Intl.NumberFormat().format(data.rank)}\n` +
        `• **Country Rank:** #${new Intl.NumberFormat().format(
          data.countryRank
        )} (${data.country} :flag_${data.country.toLowerCase()}:)\n` +
        `• **PP:** ${new Intl.NumberFormat().format(Math.round(data.pp))}\n`,
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
