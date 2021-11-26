import { MessageEmbed } from "discord.js";
import { BSClient } from "../../client/Client";
import { Song } from "../../interfaces/Song";

export const createSongEmbed = (data: Song): MessageEmbed | undefined => {
 const embed = new MessageEmbed()
  .setTitle(`**Beatmap:** ${data.name}`)
  .setDescription(
   `:inbox_tray: [One click install](http://spectrix.pythonanywhere.com/botsaber?key=${data.id}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!\n` +
   `:eyes: [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id=${data.id})\n` +
   `🔑 ID: ${data.id}`
  )
  .setColor("#0000ff")
  .setURL(`https://beatsaver.com/beatmap/${data.id}`)
  .setThumbnail(data.versions[0].coverURL);

 const author =
  data.metadata.levelAuthorName === "Beat Sage"
   ? `${data.metadata.levelAuthorName} (Automapping AI 🤖)`
   : data.metadata.levelAuthorName;
 const minutes = Math.floor(data.metadata.duration / 60);
 const seconds = data.metadata.duration - minutes * 60;
 const duration = `${String(minutes).padStart(2, "0")}:${String(
  seconds
 ).padEnd(2, "0")}`;
 let difficulties = "";
 data.versions[0].diffs[0].difficulty;
 for (let diff of data.versions[0].diffs) {
  if (diff.characteristic !== "Standard") break;
  difficulties += diff.difficulty + ", ";
 }
 embed.addFields([
  {
   name: ":information_source: __Beatmap Info__",
   value:
    `• **Level Author:** ${author}\n` +
    `• **Duration:** ${duration}\n` +
    `• **Beatmap BPM:** ${data.metadata.bpm}\n` +
    `• **Ranked:** ${data.ranked}`,
   inline: false,
  },
  {
   name: "📈 __Beatmap Stats__",
   value:
    `• **Downloads:** ${data.stats.downloads}\n` +
    `• **Upvotes:** ${data.stats.upvotes}\n` +
    `• **Downvotes:** ${data.stats.downvotes}\n` +
    `• **Rating:** ${data.stats.score !== 0
     ? Math.round(data.stats.score * 100) + "%"
     : "Unranked"
    }`,
   inline: false,
  },
  {
   name: "📊 Beatmap Difficulties",
   value: difficulties
    .trimEnd()
    .substr(0, difficulties.trimEnd().length - 1),
  },
 ]);

 if (data.description.length > 0 && data.description.length < 1024) {
  embed.addField(
   "📋 __Description__",
   `\`\`\`${data.description}\`\`\``,
   false
  );
 }

 return embed;
};
