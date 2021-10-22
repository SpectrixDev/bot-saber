import { Run } from "../../interfaces/Command";

export const run: Run = async (_client, commandInteraction, _options) => {
  commandInteraction.reply("Pong!");
};

export const name: string = "ping";
export const description: string = "test ping command";
