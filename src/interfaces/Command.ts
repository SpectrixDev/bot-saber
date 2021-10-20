import { BSClient } from "../client/Client";
import { ApplicationCommandOption, CommandInteraction } from "discord.js";

export interface Run {
	(
		client: BSClient,
		commandInteraction: CommandInteraction,
		options: ApplicationCommandOption[]
	): Promise<void>;
}

export interface Command {
	name: string;
	category: string;
	run: Run;
}
