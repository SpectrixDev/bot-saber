import { EmojiIdentifierResolvable, MessageButtonStyle } from "discord.js";
import { Run } from "../interfaces/Button";

export const run: Run = async (client, buttonInteraction) => {
	buttonInteraction.update({
		content: "you clicked the button",
		components: [],
	});
};

export const customId: string = "test_button";
export const label: string = "Test Button";
export const style: MessageButtonStyle = "PRIMARY";
export const emoji: EmojiIdentifierResolvable = "🔨";
