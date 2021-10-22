require("dotenv-safe").config();
import { Client, Collection, Intents } from "discord.js";
import consola, { Consola } from "consola";
import { Command } from "../interfaces/Command";
import { Event } from "../interfaces/Event";
import { globPromise } from "../utils/globPromise";
import { Button } from "../interfaces/Button";

export class BSClient extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public buttons: Collection<string, Button> = new Collection();
	public events: Collection<string, Event> = new Collection();

	public constructor() {
		super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
	}

	public async start(): Promise<void> {
		this.logger.info("Starting bot...");
		if (process.env.DEBUG === "true") {
			this.login(process.env.DEV_TOKEN);
		} else {
			this.login(process.env.BOT_TOKEN);
		}

		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.ts,.js}`
		);
		eventFiles.map(async (file: string) => {
			const event: Event = await import(file);
			this.events.set(event.name, event);
			this.on(event.name, event.run.bind(null, this));
		});
	}
}
