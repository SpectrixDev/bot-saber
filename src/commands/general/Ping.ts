import { Run } from "../../interfaces/Command";

export const run: Run = async (client, commandInteraction, options) => {
	commandInteraction.reply("Pong!");
};

export const name: string = "ping2";
export const description: string = "test ping command";
