const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = class uptimeCommand extends Command{
    constructor(client){
        super(client, {
            name: "uptime",
            aliases: ["ut"],
            group: "info", 
            memberName: "uptimecommand", 
            description: "Bot's uptime", 
        })
    }

    async run(msg){

        const uptime = moment.duration(this.client.uptime).format("d [Days], h [Hours], m [Minutes], s [Seconds]")

        msg.say(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`${this.client.user.username} uptime: **${uptime}**`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL ))
        
    }
}