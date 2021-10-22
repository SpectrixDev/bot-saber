import {
	ApplicationCommandOptionData,
	ButtonInteraction,
	MessageActionRow,
	MessageButton,
} from "discord.js";
import { Run } from "../../interfaces/Command";
import { buttonBuilder } from "../../utils/buttonBuilder";

export const run: Run = async (client, commandInteraction, options) => {
	const choice = options.getString("choice");

	const button = client.buttons.get("test_button");
	if (!button) return;
	const row = new MessageActionRow().addComponents(buttonBuilder(button));

	commandInteraction.reply({
		content: `you selected: ${choice}`,
		components: [row],
	});
};

export const name: string = "choices";
export const description: string = "test choices command";
export const options: ApplicationCommandOptionData[] = [
	{
		type: "STRING",
		name: "choice",
		description: "some choices idk",
		required: true,
		choices: [
			{
				name: "choice 1",
				value: "choice_1",
			},
			{
				name: "choice 2",
				value: "choice_2",
			},
		],
	},
];
