const { Message } = require("discord.js");

module.exports = {
  name: "args-info",
  aliases: ['args'],
  description: "Information about the arguments provided.",
  args: true,
  execute(msg, args) {
    if (args[0] === "foo") {
      return msg.channel.send("bar");
    } else if (args[0] === "69") {
      return msg.channel.send("haha nice");
    }

    msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
