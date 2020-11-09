const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let ticke = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`<a:giffornothing:759608132732715070> **Fetching info** <a:giffornothing:759608132732715070>`)
    let msg = await message.channel
      .send(ticke)
      .then(m => m.delete({ timeout: 3500 }));



      let helpEmbed = new Discord.MessageEmbed()
      .setDescription("Bot Commands")
      .setColor("#2232c7")
      .setAuthor('Stars ticket bot help', `${client.user.displayAvatarURL()}`, 'https://discord.gg/KWF8tcT')
   
  
    .addField('Description', [
      `Stars ticket bot is a  ticket bot for Stars Devlopment Server `,
      '\u200b'
  ], true)
  .addField('Prefix', [
    `The preifx for Stars ticket bot is p! `,
    '\u200b'
  ], true)
  .addField('Commands ', [
    `p!ticket (reason) make a ticket\n p!close (reason) close a ticket`,
    '\u200b'
  ], true)
  .addField('Other info ', [
    `Nothing at the moment.`,
    '\u200b'
  ], true)

  .setTimestamp()
  
  
    message.channel.send(helpEmbed);
  
};
exports.conf = {
    commands: ["info", "Info","help","Help"],
    enabled: true,
    guildOnly: true
  };
  exports.help = {
    name : "ticket"
  }