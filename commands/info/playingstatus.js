const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class playingstatusCommand extends Command {
    constructor(client){
        super(client, {
            name: "playingstatus", 
            aliases: ["status", "ps"], 
            description: "returns mentioned members playing status", 
            group: "info", 
            memberName: "playingstatuscommand", 
            args: [{
                type: "member",
                prompt: "Which user's playing status do you want to view?", 
                key: "member",
            }]
        })
    }

            

    async run (msg, {member}){

    
    //     //!Defining embed colour based on member's status
    //     let embedColor
    //     let statusMsg
    //     if (member.presence.status === "online") embedColor = "GREEN"
    //     if (member.presence.status === "idle") embedColor = "ORANGE"
    //     if (member.presence.status === "dnd") embedColor = "RED"
    //     if (member.presence.status === "offline") embedColor = "GREY"

    //     //!Defining precense type
    //     let pState = "Nothing"
    //     if(member.presence.status !== "offline"){
    //     if(member.presence.game.type === 0) pState = "Playing"
    //     if(member.presence.game.type === 1) pState = "Streaming"
    //     if(member.presence.game.type === 2) pState = "Listening"
    //     if(member.presence.game.type === 3) pState = "Watching"
    //     }

    //     //!Defining status emojis
    //     let emojiServer = this.client.guilds.find(s => s.id === "535256206294384650")
       
    //         let onlineEmoji = emojiServer.emojis.find(e => e.name === "online")
    //         let idleEmoji = emojiServer.emojis.find(e => e.name === "idle")
    //         let dndEmoji = emojiServer.emojis.find(e => e.name === "dnd")
    //         let offlineEmoji = emojiServer.emojis.find(e => e.name === "offline")
    //         let streamingEmoji = emojiServer.emojis.find(e => e.name === "streaming")
        
    //         //!Linking status emojis to member's current status
    //          let  statusEmoji 
    //         if (member.presence.status === "online") statusEmoji = onlineEmoji
    //         if (member.presence.status === "idle") statusEmoji = idleEmoji
    //         if (member.presence.status === "dnd") statusEmoji = dndEmoji
    //         if (member.presence.status === "offline") statusEmoji = offlineEmoji
    //         if (member.presence.status === "streaming") statusEmoji = streamingEmoji


    //     //!offline embed

    //     if(member.presence.status === "offline") msg.say(new RichEmbed()
    //     .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
    //     .setDescription(`**${member}\'s Playing Status**
    //     Offline ${statusEmoji}`)
    //     .setColor(embedColor)
    //     .setTimestamp()
    //     .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    

    //     //!Not status embed
    //    if(member.presence.status !== "offline") await msg.say(new RichEmbed()
    //     .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
    //     .setDescription(`**${member}\'s Playing Status**
    //     ${member.user.presence.status.toUpperCase()} ${statusEmoji}`)
    //     .setColor(embedColor)
    //     .setTimestamp()
    //     .setFooter(this.client.user.username, this.client.user.displayAvatarURL))

    //     if(member.presence.status === "offline" || "online" || "idle" || "dnd"){
            
    //     }

    
    }
}