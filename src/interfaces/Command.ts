import { BSClient } from "../client/Client";
import {
	ApplicationCommandOption,
	CommandInteraction,
	CommandInteractionOptionResolver,
} from "discord.js";

export interface Run {
	(
		client: BSClient,
		commandInteraction: CommandInteraction,
		options: CommandInteractionOptionResolver
	): Promise<void>;
}

export interface Command {
	name: string;
	category: string;
	description: string;
	run: Run;
}
