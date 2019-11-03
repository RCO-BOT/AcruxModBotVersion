const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class dmCommand extends Command {
    constructor(client){
        super(client, {
            name: "dm", 
            aliases: ["message"],
            group: "moderation",
            memberName: "dmcommand",
            description: "Send a DM to mentioned member. Can be embedded ` !dm [user] [true/false] [message] ` ",
            userPermissions: ["MANAGE_MESSAGES"],
            args: [{
                type: "member",
                prompt: "Which member do you want to DM?",
                key: "member"
            },{
                type: "boolean",
                prompt: "Do you want to embed? `true/false`",
                key: "toEmbed"
            }, {
                type: "boolean",
                prompt: "Do you want to remain anonymous? `true/false`",
                key: "anonymous"
            },{
                type: "string",
                prompt: "What would you like the message to be?",
                key: "content"
            }]
        })
    }

    async run(msg, {member, toEmbed, anonymous, content }){
        let auth = " "
        if(!anonymous) auth = `A message from ${msg.author.tag}`

        if(toEmbed) member.send(new RichEmbed()
        .setDescription(`${auth}\n${content}`)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    

        if(!toEmbed) member.send(`${auth} ${content}`)
    }
}