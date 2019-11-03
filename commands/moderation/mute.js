const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")
const ms = require("ms")


module.exports = class muteCommand extends Command {
    constructor(client){
        super(client, {
            name: "mute",
            aliases: ["calm", "hush"],
            group: "moderation",
            memberName: "mutecommand",
            description: "Mutes mentioned memebr (Default 10 mins)",
            userPermissions: ["MANAGE_MESSAGES"],
            args: [{
                type: "member",
                prompt: "Which member do you want to mute? `!mute [user] [time] [reason]`",
                key: "member",
            },{
                type: "string",
                prompt: "For how long? `min - 1m max - 24h`",
                key: "amount"
            },{
                type: "string",
                prompt: "For what reason?",
                key: "reason"
            }]
        })
    }

    async run(msg, {member, amount, reason}) {
    
        if(msg.guild.member(member).id === msg.author.id) return msg.say("You can't mute yourself")
        if(msg.guild.member(member).hasPermission(["KICK_MEMBERS"])) return msg.say("This user can not be muted")
        if(!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.say("I don't have the manage roles permissions")
        
        let muteRole = msg.guild.roles.find(r => r.name.toLowerCase() === "muted")

        if(!muteRole) msg.say("I couldn't find a role name `muted`")
        
        let mutedPersonRoles = member.roles.filter(r => r.id != msg.guild.id).map(rn => rn.id)

        if(member.roles.has(muteRole.id)) return msg.say(`This user is already muted`)

        let logChannel = msg.guild.channels.find(c => c.name === "logs")
        

    
        //!Mute
        if(!logChannel) return msg.say("I tried to log this but couldn't find a channel named `logs`")

        logChannel.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`User Muted`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`User muted: `, member, true)
        .addField(`Length of mute`, `${ms(ms(amount))}`, true)
        .addField(`Reason: `, reason))

        await  member.addRole(muteRole)
        msg.say(`${member} was muted for ${ms(ms(amount))}`)
        member.removeRoles(mutedPersonRoles)
        member.send(`You have been muted in ${msg.guild.name} for ${ms(ms(amount))}\nRason: ${reason}`)

        
        
        //!UnMute
         setTimeout(async() => {

            if(!logChannel) return msg.say("I tried to log this but couldn't find a channel named `logs`")

            logChannel.send(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`User Unmuted`)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
            .addField(`User unmuted: `, member, true))

            member.addRoles(mutedPersonRoles).catch(err => console.log(err));

            await member.removeRole(muteRole).catch(err => console.log(err))
            await member.send(`You've been unmuted in ${msg.guild.name}`)

        }, ms(amount))


         }
}   