
const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class unbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            aliases: [],
            group: 'moderation',
            memberName: 'unbancommand',
            userPermissions: ["BAN_MEMBERS"], // This auto looks for the member's permissions :P 
            description: 'unbans a member from the server',
                args:[{
                    type: 'user',
                    prompt: 'Which user do you want to unban?',
                    key: 'user'
                }] 
        })
    }

    async run(msg, {user}) {  
        let logChannel = msg.guild.channels.find(c => c.name === "logs")
        let logMsg = ""
        if(!logChannel) logMsg = "I tried to log this but I couldn't find a channel named `logs`"
        if(!msg.guild.me.hasPermission(['BAN_MEMBERS'])) return msg.reply('I need either the `Ban Members` or `Admin` permission to be able to unban members')
        

        let bans = await msg.guild.fetchBans();
        if(!bans.has(user.id)) return msg.channel.send(`${user.tag} isn't banned!`)
              
                msg.guild.unban(user)
                msg.say(`${user.tag} has been unbanned\n${logMsg}`).then(logChannel.send (new RichEmbed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setDescription(`${user.username} was unbanned`, true)
                .setColor("RED")
                .addField(`User: `, `${user.username}`, true)
                .addField(`ID: `, `${user.id}`, true)
                .addField(`unbanned by: `, `${msg.author.username}`, true)
                .addField(`Time unbanned: `, `${msg.createdAt.toLocaleTimeString()}`, true)
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL)))
    }

}