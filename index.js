const fs = require("fs");
const Discord = require("discord.js");
const Enmap = require("enmap");
const { prefix, token, devToken } = require("./config.json");
const { config } = require("process");

const DEBUG = false;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep",
});

const defaultSettings = {
  prefix: "b!",
};

client.on("guildDelete", (guild) => {
  client.settings.delete(guild.id);
  client.user.setActivity(`over ${client.guilds.cache.size} servers | b!help  `, { type: 'WATCHING' })
});

client.on('guildCreate', (guild) => {
  client.user.setActivity(`over ${client.guilds.cache.size} servers | b!help`, { type: 'WATCHING' })
})

const commandFiles = fs.readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity(`over ${client.guilds.cache.size} servers | b!help`, { type: 'WATCHING' })
});

client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return;

  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

  if (message.content.indexOf(guildConf.prefix) !== 0) return;

  const args = message.content.split(/\s+/g);
  const commandName = args.shift().slice(guildConf.prefix.length).toLowerCase();

  const commandFile = client.commands.get(commandName) ||
    client.commands.find((cmd) =>
      cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!commandFile) return;

  if (commandFile.args && !args.length) {
    return message.channel.send(
      `❌ You didn't provide any arguments, ${message.author}... <:thronking:503200655507456003>`,
    );
  }

  try {
    commandFile.execute(message, args, client, guildConf, defaultSettings);
  } catch (err) {
    console.error(err);
    message.reply(`❌ There was an error trying to execute that command! Report this to my devs! (${guildConf.prefix}help)`)
  }
});

client.login(DEBUG ? devToken : token);
