const { samID, spectrixID } = require("../config.json");

module.exports = {
  name: "eval",
  aliases: ["js"],
  description:
    "Owner-specifc command for running eval javascript. *Don't even try and use it lmfao it won't work*",
  usage: "b!eval [code]",
  execute(msg, args, client) {
    if (
      (msg.author.id !== samID) && (msg.author.id !== spectrixID)
    ) {
      return msg.reply("You do not have permission to run this command!");
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") {
        evaled = require("util").inspect(evaled);
      }

      msg.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};

function clean(text) {
  if (typeof (text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(
      /@/g,
      "@" + String.fromCharCode(8203),
    );
  } else {
    return text;
  }
}
