const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class banCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: [],
            group: 'moderation',
            memberName: 'bancommand',
            description: 'ban a member from the server',
                args:[{
                    type: 'member',
                    prompt: 'Which member do you want to ban?',
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

        
        if(msg.guild.member(member).hasPermission(['ADMINISTRATOR'])) return msg.reply('This member can not be banned')
        if(!member.bannable) return msg.reply('This member can not be baned')
        if(!msg.guild.me.hasPermission(['BAN_MEMBERS'])) return msg.reply('I need the `Ban Members` permission to be able to ban members')
        
        msg.guild.member(member).ban()
        msg.say(`${member.user.username} has been banned`)
        
        if(logChannel){
            logChannel.send (new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`${member.user.username} was banned`, true)
        .setColor("RED")
        .addField(`User: `, `${member.user.username}`, true)
        .addField(`ID: `, `${member.user.id}`, true)
        .addField(`banned by: `, `${msg.author.username}`, true)
        .addField(`banned in: `, `<#${msg.channel.id}>`, true)
        .addField(`Time banned: `, `${msg.createdAt.toLocaleTimeString()}`, true)
        .addBlankField()
        .addField(`Reason: `, `${content}`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
        }else msg.say(logMsg)
        
    
    }

}