import { MessageEmbed } from "discord.js";
import { Song } from "../../interfaces/Song";

export const createSongEmbed = (data: Song): MessageEmbed => {
  const embed = new MessageEmbed()
    .setTitle(`**Beatmap:** ${data.name}`)
    .setDescription(
      `:inbox_tray: [One click install](http://spectrix.pythonanywhere.com/botsaber?key=${data.id}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!\n` +
      `:eyes: [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id=${data.id})`
    )
    .setColor("#0000ff")
    .setURL(`https://beatsaver.com/beatmap/${data.id}`);

  return embed;
};
