const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = class serverinfoCommand extends Command {
    constructor(client){
        super(client, {
            name: "serverinfo",
            aliases: ["si"],
            description: "Returns server information",
            group: "info", 
            memberName: "serverinfo"
        })
    }

    async run(msg){
        
    //!Defining server roles
        let sRoles = msg.guild.roles.filter(c => c.id !== msg.guild.id).sort((a, b) => b.position - a.position).map(c => c).join(" | ")

    //!Defining member type counts
        let botCount = msg.guild.members.filter(h => h.user.bot).size
        let humanCount = msg.guild.members.size - botCount

    //!Defining channel counts + types
        let channelCount = msg.guild.channels.size - msg.guild.channels.filter(c => c.type === 'category').size
        let textChannelCount = msg.guild.channels.filter(c => c.type === 'text').size
        let voiceChannelCount = msg.guild.channels.filter(v => v.type === 'voice').size

    //!Defining member presence
        let onlineCount = msg.guild.members.filter(m => m.presence.status === "online").size
        let idleCount = msg.guild.members.filter(m => m.presence.status === "idle").size
        let dndCount = msg.guild.members.filter(m => m.presence.status === "dnd").size
        let offlineCount = msg.guild.members.filter(m => m.presence.status === "offline").size
        let streamingCount = msg.guild.members.filter(m => m.presence.status === "streaming").size

    //!Start of defining server owner highest role
        let roleCollection = []
        
        let serverOwner = msg.guild.owner.id

        let ownerRoles = msg.guild.owner.roles.filter(r => r.id !== msg.guild.id).sort((a, b) => b.position - a.position).map(rn => rn.color)
        roleCollection.push(ownerRoles)
        
        let highestRole = ownerRoles[0]
    //!End of definign

    //!Defining emojis for member presence 

    let emojiServer = this.client.guilds.find(s => s.id === "535256206294384650")
       
    let onlineEmoji = emojiServer.emojis.find(e => e.name === "online")
    let idleEmoji = emojiServer.emojis.find(e => e.name === "idle")
    let dndEmoji = emojiServer.emojis.find(e => e.name === "dnd")
    let offlineEmoji = emojiServer.emojis.find(e => e.name === "offline")
    let streamEmoji = emojiServer.emojis.find(e => e.name === "streaming")

        msg.say(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`Server information for **${msg.guild.name}**`)
        .setThumbnail(msg.guild.iconURL)
        .setColor(highestRole)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`Server owner: `, msg.guild.owner, true)
        .addField(`Owner ID: `, msg.guild.owner.id, true)
        .addField(`\u200b`, `[Server Icon](${msg.guild.iconURL})`)
        .addField(`Member count: `, msg.guild.members.size)
        .addField(`Humans: `, humanCount, true)
        .addField(`Bots: `, botCount, true)
        .addField(`Channel count:`, channelCount)
        .addField(`Text channels: `, textChannelCount, true)
        .addField(`Voice channels: `, voiceChannelCount, true)
        .addField(`Server creation date`,` ${moment(msg.guild.createdAt).format('LL')} at ${msg.guild.createdAt.toLocaleTimeString()}`)
        .addBlankField()
        .addField(`Server roles: `, sRoles)
        .addBlankField()
        .addField(`Onlie ${onlineEmoji} ${onlineCount}`, `\u200b`, true)
        .addField(`Idle ${idleEmoji} ${idleCount}`, `\u200b`, true)
        .addField(`DnD ${dndEmoji} ${dndCount}`, `\u200b`, true)
        .addField(`Offline ${offlineEmoji} ${offlineCount}`, `\u200b`, true)
        .addField(`Streaming ${streamEmoji} ${streamingCount}`, `\u200b`, true))

    }
}