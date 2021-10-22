import {
	ApplicationCommandOptionData,
	ApplicationCommandSubCommandData,
} from "discord.js";
import { getSongById } from "../../api/beatSaver";
import { Run } from "../../interfaces/Command";

export const run: Run = async (_client, commandInteraction, options) => {
	const subcommand = options.getSubcommand();
	let data;
	if (subcommand === "id") {
		const value = options.getString("value");
		if (!value) {
			return;
		}
		data = await getSongById(value);

		const toSend =
			`Name: ${data.name}\n` +
			`Author: ${data.uploader.name}\n` +
			`ID: ${data.id}\n` +
			`Cover Image: ${data.versions[0].coverURL}\n` +
			`Description: \`\`\`${data.description}\`\`\``;

		await commandInteraction.reply(toSend);
	}
};

export const name: string = "song";
export const description: string = "Get info on a song/beatmap";
export const options: ApplicationCommandOptionData[] = [
	{
		type: "SUB_COMMAND",
		name: "id",
		description: "Get song info via its ID.",
		options: [
			{
				type: "STRING",
				name: "value",
				description: "Value to get song info from.",
				required: true,
			},
		],
	},
	{
		type: "SUB_COMMAND",
		name: "name",
		description: "Get song info via its name.",
		options: [
			{
				type: "STRING",
				name: "value",
				description: "Value to get song info from.",
				required: true,
			},
		],
	},
];
