const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    console.log('1')
    const reason = message.content.split(" ").slice(1).join(" ");

    let Catergory = message.guild.channels.cache.find(category => category.name === "Tickets");

    if (message.guild.me.hasPermission(`MANAGE_CHANNELS`) && !Catergory) {
        Catergory = await message.guild.channels.create('Tickets', {
            type: 'category',
        });
    }

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !Catergory) {
        let Nah_bruh = new Discord.MessageEmbed()
        .setTitle("Sorry! I currently haven\'t been granted the permission: Manage Channels. Please contact an owner or an Admin to give me the permission!")
        .setFooter(`No Perms!`)
        .setColor(`RED`)
        message.channel.send(Nah_bruh)

    } 

    let role = message.guild.roles.cache.find(role => role.name === "Ticket Access")

    if (!role) {
            let NoRolePerms = new Discord.MessageEmbed()
        .setTitle(`I do not have the following permission: Manage Roles. I need this permission so I can give you access to the command!`)
        .setFooter(`No Perms!`)
        .setColor(`RED`)
        return message.channel.send(NoRolePerms)
    }

    const TicketName = `ticket-${message.author.id}`
    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id.toLowerCase()}`)) {
        let Alreadyopen = new Discord.MessageEmbed()
        .setTitle(`Ticket Already Opened`)
        .setDescription('<a:error:759608124851224596> **Open Ticket:** You have a ticket open, to create another one, /close your current ticket! <a:error:759608124851224596>')
        .setColor(`RED`)
        return message.channel.send(Alreadyopen)
    }

    if (!reason) {
        let Subject = new Discord.MessageEmbed()
        .setTitle(`<a:error:759608124851224596> **DiscordAPI Error:** Non-specified Reason to open ticket <a:error:759608124851224596>`)
        .setColor('RED')
        return message.channel.send(Subject)

     }


        let ticke = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<a:giffornothing:759608132732715070> **Contacting Support Team**`)
        let msg = await message.channel
          .send(ticke)
          .then(m => m.delete({ timeout: 2000 }));

          let tickel = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`<a:error:759608124851224596> **Creating Channel**`)
          msg = await message.channel
            .send(tickel)
            .then(m => m.delete({ timeout: 2000 }));

            let cont = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`<a:giffornothing:759608132732715070> **Directing Conversation**`)
            msg = await message.channel
              .send(cont)
              .then(m => m.delete({ timeout: 2000 }));

    message.guild.channels.create(TicketName, { parent: Catergory.id, topic: `Ticket User: ${message.author.username}\nReason: ${reason}` }).then(c => {
        const support = message.guild.roles.cache.get(role.id)
        c.updateOverwrite(support, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        }),
        c.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        }),
        c.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        })

        const SupportTicket = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`<:ticktick:759607153618714625> Help ticket activated by ${message.author.username}! <:ticktick:759607153618714625> `)
        .setDescription(`<@${message.author.id}> Staff will be with you soon! In the mean time, please add more information in your ticket <#${c.id}>`)
        .setTimestamp()
        .setFooter(`Ticket Channel Succesfully Made!`)
        message.channel.send(SupportTicket)

        let welcome = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`New Help Tickted Activated By ${message.author.username}`, `<@${message.author.id}> Blah blah blah`)
        .addField(`Reason provided:`, reason)
        .setTimestamp()
        .setFooter(`Stars ticket bot`)
        c.send(welcome)
}) 
}
exports.conf = {
    commands: ["ticket", "Ticket"],
    enabled: true,
    guildOnly: true
  };
  exports.help = {
    name : "ticket"
  }