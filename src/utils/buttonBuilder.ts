import { MessageButton } from "discord.js";
import { Button } from "../interfaces/Button";

export const buttonBuilder = (button: Button): MessageButton => {
	const returnButton = new MessageButton()
		.setCustomId(button.customId)
		.setLabel(button.label)
		.setStyle(button.style);
	if (button.emoji) returnButton.setEmoji(button.emoji);
	return returnButton;
};
