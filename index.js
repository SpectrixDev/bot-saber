const fs = require("fs");
const Discord = require("discord.js");
const Enmap = require("enmap");
const { prefix, token } = require("./config.json");

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
  welcomeChannel: "welcome",
  welcomeMessage:
    "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
};

client.on("guildDelete", (guild) => {
  client.settings.delete(guild.id);
});

client.on("guildMemberAdd", (member) => {
  client.settings.ensure(member.guild.id, defaultSettings);

  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);

  let welcomeChannel = member.guild.channels.cache
  .find((channel) =>
    channel.name === client.settings.get(member.guild.id, "welcomeChannel")
  )

  if(welcomeChannel) {
    welcomeChannel
      .send(welcomeMessage)
      .catch(console.error);
  }   
});

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
      `You didn't provide any arguments, ${message.author}`,
    );
  }

  try {
    commandFile.execute(message, args, client, guildConf, defaultSettings);
  } catch (err) {
    console.error(err);
    message.reply("❌ There was an error trying to execute that command!");
  }
});

client.login(token);
