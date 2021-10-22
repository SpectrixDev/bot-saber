import { BSClient } from "../client/Client";
import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
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
  subcommands?: ApplicationCommandSubCommandData[] | undefined;
  run: Run;
}
