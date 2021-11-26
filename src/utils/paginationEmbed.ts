import {
  ButtonInteraction,
  CommandInteraction,
  Interaction,
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
} from "discord.js";

/**
 * Creates a pagination embed
 * @param {CommandInteraction} interaction
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {number} timeout
 * @returns
 */
export const paginationEmbed = async (
  interaction: CommandInteraction,
  pages: MessageEmbed[],
  timeout = 30000
) => {
  let page = 0;

  const startButton = new MessageButton()
    .setCustomId("start")
    .setLabel("Start")
    .setStyle("SECONDARY")
    .setEmoji("⏮");

  const prevButton = new MessageButton()
    .setCustomId("previous")
    .setLabel("Previous")
    .setStyle("SECONDARY")
    .setEmoji("◀");

  const nextButton = new MessageButton()
    .setCustomId("next")
    .setLabel("Next")
    .setStyle("SECONDARY")
    .setEmoji("▶");

  const endButton = new MessageButton()
    .setCustomId("end")
    .setLabel("End")
    .setStyle("SECONDARY")
    .setEmoji("⏭");

  const row = new MessageActionRow().addComponents([
    startButton,
    prevButton,
    nextButton,
    endButton,
  ]);

  //has the interaction already been deferred? If not, defer the reply.
  if (interaction.deferred == false) {
    await interaction.deferReply();
  }

  const curPage = (await interaction.editReply({
    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
    components: [row],
  })) as Message;

  const filter = (i: MessageComponentInteraction) =>
    i.customId === startButton.customId ||
    i.customId === prevButton.customId ||
    i.customId === nextButton.customId ||
    i.customId === endButton.customId;

  const collector = curPage.createMessageComponentCollector({
    filter,
    time: timeout,
  });

  collector.on("collect", async (i) => {
    switch (i.customId) {
      case startButton.customId:
        page = 0;
        break;
      case prevButton.customId:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case nextButton.customId:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case endButton.customId:
        page = pages.length - 1;
        break;
      default:
        break;
    }
    await i.deferUpdate();
    await i.editReply({
      embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
      components: [row],
    });
    collector.resetTimer();
  });

  collector.on("end", () => {
    if (!curPage.deleted) {
      const disabledRow = new MessageActionRow().addComponents(
        startButton.setDisabled(true),
        prevButton.setDisabled(true),
        nextButton.setDisabled(true),
        endButton.setDisabled(true)
      );
      curPage.edit({
        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
        components: [disabledRow],
      });
    }
  });

  return curPage;
};
