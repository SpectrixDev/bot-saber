import { Client, Collection, Intents } from "discord.js";
import consola, { Consola } from "consola";
import { Command } from "../interfaces/Command";
import { Event } from "../interfaces/Event";

export class BSClient extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();

	public constructor() {
		super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
	}
}

//TODO figure out how interaction commands work
