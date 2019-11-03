const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")


module.exports = class unmuteCommand extends Command {
    constructor(client){
        super(client, {
            name: "unmute",
            aliases: ["uncalm", "unhush"],
            group: "moderation",
            memberName: "unmutecommand",
            description: "unutes mentioned memebr",
            userPermissions: ["MANAGE_MESSAGES"],
            args: [{
                type: "member",
                prompt: "Which member do you want to unmute?`",
                key: "member",
            }]
        })
    }

    async run(msg, {member, amount, reason}) {
    
        
        if(!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.say("I don't have the manage roles permissions")
        
        let muteRole = msg.guild.roles.find(r => r.name.toLowerCase() === "muted")
        

        if(!member.roles.has(muteRole.id)) return msg.say(`This user isn't muted`)

        let logChannel = msg.guild.channels.find(c => c.name === "logs")

        await member.removeRole(muteRole)

        member.send(`You've been unmuted in ${msg.guild.name}`)

        logChannel.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`User manually unmuted`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`User unmuted: `, member, true)
        .addField(`Unmuted by: `, msg.author.tag))

         }
}   