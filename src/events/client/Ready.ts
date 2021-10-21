import {
	GuildApplicationCommandManager,
	ApplicationCommandManager,
	ApplicationCommand,
	GuildResolvable,
} from "discord.js";
import { Command } from "../../interfaces/Command";
import { Run } from "../../interfaces/Event";
import { globPromise } from "../../utils/globPromise";

export const run: Run = async (client, ...args) => {
	if (client.user) {
		client.logger.success(
			`${client.user.tag} is ready to serve ${client.guilds.cache.size} guilds.`
		);
	}

	const guildId = "323045050453852170";
	const guild = client.guilds.cache.get(guildId);
	let interactions:
		| GuildApplicationCommandManager
		| ApplicationCommandManager<
				ApplicationCommand<{ guild: GuildResolvable }>,
				{ guild: GuildResolvable },
				null
		  >
		| undefined;

	if (guild) {
		interactions = guild.commands;
	} else {
		interactions = client.application?.commands;
	}

	const commandFiles: string[] = await globPromise(
		`${__dirname}/../../commands/**/*{.ts,.js}`
	);
	commandFiles.map(async (file: string) => {
		const command: Command = await import(file);
		client.commands.set(command.name, command);
		if (!interactions) {
			return;
		}

		interactions.create({
			name: command.name,
			description: command.description,
		});
	});
};

export const name: string = "ready";
