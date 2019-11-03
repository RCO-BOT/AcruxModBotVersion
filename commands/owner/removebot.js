const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class removebotCommand extends Command {
    constructor(client){
        super(client, {
            name: "removebot",
            aliases: ["rb"],
            description: "Removes bot from a guild [BOT OWNER ONLY]",
            group: "owner",
            memberName: "removebotcommand",
            args: [{
                type: "string", 
                prompt: "Which server", 
                key: "server"
            }, {
                type: "string",
                prompt: "Reason", 
                key: "reason"
            }]

        })
    }

    async run(msg, {server, reason}){

        let logChannel = this.client.channels.find(c => c.id === "636464003375431680")
        if(!logChannel) return
        

        if(!msg.author.id === "248947473161256972") return
       

        let servertoleave = this.client.guilds.find(s => s.id === server)

        if(!servertoleave) msg.say(`Acrux isn't in this server`)
        
        if(msg.guild.id === "535256206294384650"){
            msg.say(`Why would you kick the bot from your own server`)
        }else if(servertoleave) {
             servertoleave.leave().then(msg.say(`Left server ${servertoleave.name}`))

             await servertoleave.owner.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`**IMPORTANT**`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`${this.client.user.username} has been kicked from your server by the bot owner`, `Reason: ${reason}`)
        .addField(`If you have any questions or want to despute this please contact VAL#0001 via the`, "[Support Server](https://discord.gg/eCtANM2)"))

        await logChannel.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setColor("RED")
        .setDescription(`Client kicked from a guild`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`Kicked from`, `${servertoleave.name} with ID: ${servertoleave.id}`)
        .addField(`Reason: `, reason)
        .addField(`Guild info:`, "\u200b")
        .addField(`Guild owner: `, `${servertoleave.owner}   ID: ${servertoleave.owner.id}`))
        }
        
        
    }
}