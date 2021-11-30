import {
 GuildApplicationCommandManager,
 ApplicationCommandManager,
 ApplicationCommand,
 GuildResolvable,
 APIErrors,
} from "discord.js";
import { Button } from "../../interfaces/Button";
import { Command } from "../../interfaces/Command";
import { Run } from "../../interfaces/Event";
import { globPromise } from "../../utils/globPromise";

export const run: Run = async (client, ...args) => {
 if (client.user) {
  client.logger.success(
   `${client.user.tag} is ready to serve ${client.guilds.cache.size} guilds.`
  );
  const avatarURL = client.user.avatarURL({ format: "png" });
  if (avatarURL !== null) {
   client.logo = avatarURL;
  }
 }

 const guildId = "323045050453852170";
 const guild = client.guilds.cache.get(guildId);
 let interactionCommands:
  | GuildApplicationCommandManager
  | ApplicationCommandManager<
   ApplicationCommand<{ guild: GuildResolvable }>,
   { guild: GuildResolvable },
   null
  >
  | undefined;

 if (guild) {
  interactionCommands = guild.commands;
 } else {
  interactionCommands = client.application?.commands;
 }

 // if (interactionCommands) {
 //   interactionCommands.set([]);
 // }

 const commandFiles: string[] = await globPromise(
  `${__dirname}/../../commands/**/*{.ts,.js}`
 );
 commandFiles.map(async (file: string) => {
  const command: Command = await import(file);
  client.commands.set(command.name, command);
  if (!interactionCommands) {
   return;
  }

  interactionCommands.create({
   name: command.name,
   description: command.description,
   options: command.options,
  });
 });

 const buttonFiles: string[] = await globPromise(
  `${__dirname}/../../buttons/**/*{.ts,.js}`
 );
 buttonFiles.map(async (file: string) => {
  const button: Button = await import(file);
  client.buttons.set(button.customId, button);
 });
};

export const name: string = "ready";
