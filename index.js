const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("message", (message) => {
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`,
  );
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const commandFile = client.commands.get(commandName) ||
    client.commands.find((cmd) =>
      cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!commandFile) return;

  if (commandFile.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}`,
    );
  }

  try {
    commandFile.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ There was an error trying to execute that command!");
  }
});

client.login(token);
