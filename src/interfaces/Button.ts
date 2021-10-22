import {
	ButtonInteraction,
	EmojiIdentifierResolvable,
	MessageButtonStyleResolvable,
} from "discord.js";
import { BSClient } from "../client/Client";

export interface Run {
	(client: BSClient, buttonInteraction: ButtonInteraction): Promise<void>;
}

export interface Button {
	customId: string;
	label: string;
	style: MessageButtonStyleResolvable;
	emoji?: EmojiIdentifierResolvable;
	run: Run;
}
