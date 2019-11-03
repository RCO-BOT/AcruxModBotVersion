const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class ListroleCommand extends Command {
    constructor(client){
        super(client, {
            name: "listroles", 
            aliases: ['lr', 'roles'], 
            group: "info", 
            memberName: "listroles",
            description: "Lists all server roles",

        }) 
    }

    async run (msg){

        let sRoles = await msg.guild.roles.sort((a, b) => b.position - a.position).filter(r => r.id != msg.guild.id).map(c => c).join('\n\n')

        msg.say(new RichEmbed()
        .setDescription(sRoles)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
        

    }
}