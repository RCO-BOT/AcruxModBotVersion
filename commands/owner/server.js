const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js")

module.exports = class AvatarCommand extends Command {
    constructor(client){
        super(client, {
            name: "servers",
            aliases: [],
            group: "owner",
            memberName: 'servers',
            description: '[Bot owner only] Returns a list of connected servers',
            args: []
        })
    }

    run(msg) {

        this.client.guilds.forEach((guild) => {

        let embed = new RichEmbed()
        .setDescription(`${guild.name} - ${guild.id}`)

        msg.embed(embed)

    })
        
    } 
}