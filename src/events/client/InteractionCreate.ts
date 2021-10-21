import { CommandInteraction, Interaction } from "discord.js";
import { Run } from "../../interfaces/Event";

export const run: Run = async (client, interaction: CommandInteraction) => {
	const { commandName, options } = interaction;

	const command = client.commands.get(commandName);

	command!.run(client, interaction, options);
};

export const name: string = "interactionCreate";
