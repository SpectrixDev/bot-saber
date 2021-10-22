import { Interaction } from "discord.js";
import { Run } from "../../interfaces/Event";

export const run: Run = async (client, interaction: Interaction) => {
	if (interaction.isCommand()) {
		const { commandName, options } = interaction;

		const command = client.commands.get(commandName);
		if (!command) return;

		command.run(client, interaction, options);
	}
	if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		if (!button) return;
		button.run(client, interaction);
	}
};

export const name: string = "interactionCreate";
