import { BSClient } from "../client/Client";
import {
  ApplicationCommandOptionData,
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
  description: string;
  options?: ApplicationCommandOptionData[] | undefined;
  run: Run;
}
