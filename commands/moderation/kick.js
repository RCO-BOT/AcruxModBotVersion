const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class kickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: [],
            group: 'moderation',
            memberName: 'kickcommand',
            description: 'Kick a member from the server',
                args:[{
                    type: 'member',
                    prompt: 'Which member do you want to kick?',
                    key: 'member'
                },
            {
                type: 'string',
                prompt: 'For what reason?',
                key: 'content'
            }], 
        })
    }

    run(msg, {member, content}) {

        let logChannel = msg.guild.channels.find(c => c.name === "logs")
        let logMsg = ""
        if(!logChannel) logMsg = "I tried to log this but I couldn't find a channel named `logs`"

        
        if(msg.guild.member(member).hasPermission(['ADMINISTRATOR'])) return msg.reply('This member can not be kicked')
        if(!member.kickable) return msg.reply('This member can not be kicked')
        if(!msg.guild.me.hasPermission(['KICK_MEMBERS'])) return msg.reply('I need the `Kick Members` permission to be able to kick members')
        
        msg.guild.member(member).kick()
        msg.say(`${member.user.username} has been kicked\n${logMsg}`).then(logChannel.send (new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`${member.user.username} was kicked`, true)
        .setColor("RED")
        .addField(`User: `, `${member.user.username}`, true)
        .addField(`ID: `, `${member.user.id}`, true)
        .addField(`Kicked by: `, `${msg.author.username}`, true)
        .addField(`Kicked in: `, `<#${msg.channel.id}>`, true)
        .addField(`Time kicked: `, `${msg.createdAt.toLocaleTimeString()}`, true)
        .addBlankField()
        .addField(`Reason: `, `${content}`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)))
        
    
    }

}