const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let CantClose = message.guild.me.hasPermission(`MANAGE_CHANNELS`)

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Need Manage Messages to do that!");
	
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`<a:error:759608124851224596> **Missing Permission:** Manage Channels <a:error:759608124851224596>`);


    const reason = message.content.split(" ").slice(1).join(" ");

    if (!reason) {
        let NoSubject = new Discord.MessageEmbed()
        .setTitle(`<a:error:759608124851224596> Please specify a reason to close the ticket <a:error:759608124851224596>`)
        .setColor(`RED`)
        return message.channel.send(NoSubject)
    }
    let ClosedTicket = new Discord.MessageEmbed()
    .setTitle(`Ticket Closed`)
    .setColor(`GREEN`)
    .setDescription(`ticket-${message.author.id.toLowerCase()}`)
    .addField(`Reason: `, reason)
    message.channel.delete()

}
exports.conf = {
    commands: ["close", "Close"],
    enabled: true,
    guildOnly: true
  };
  exports.help = {
    name : "close"
  }