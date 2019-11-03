const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

    const serversettingsdb = require("../../models/settings/serversettings.js")

module.exports = class settingsCommand extends Command {
    constructor(client){
        super(client, {
            name: "settings", 
            group: "settings",
            memberName: "settingscommand",
            description: "View Acrux's configuration for your server"   
        })
    }

    async run(msg){

        const wls = await serversettingsdb.findOne({serverID: msg.guild.id})
            
            msg.say(new RichEmbed()
            .setDescription(`**Warn logs**
            ${wls.enabled ? "enabled" : "disabled"}
            logging in channel: ${wls.channelID ? msg.guild.channels.get(wls.channelID) : "N/A"}`))

    }

}