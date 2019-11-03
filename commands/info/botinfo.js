const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js")

module.exports = class BotInfoCommand extends Command{
    constructor(client){
        super(client, {
            name: 'botinfo',
            aliases: ['binfo', 'bi'],
            group: 'info',
            memberName: 'botinfo',
            description: 'Returns bot information for Acrux',
           
        })
    }
    run(msg, {user}){

        let embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`Bot information for Acrux\n
        Bot owner - ${this.client.owners}\n
        Created at - ${this.client.user.createdAt.toLocaleDateString()}\n
        Serving **${this.client.users.size}** members in **${this.client.guilds.size}** servers`)
        .addField(`\u200b`, "[Support Server](https://discord.gg/7VrNNh)\n[Bot Invite](https://discordapp.com/api/oauth2/authorize?client_id=634123443192987649&permissions=0&scope=bot)")
        .setColor("PURPLE")
        .setThumbnail(this.client.user.displayAvatarURL)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)

        msg.embed(embed)

    }
}