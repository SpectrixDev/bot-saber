module.exports = {
  name: "ping",
  description: "Ping!",
  execute(msg, args) {
    msg.channel.send("Pong.").then((sent) => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - msg.createdTimestamp}ms`);
    });
  },
};
