const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const mongoose = require("mongoose")

const serversettingsdb = require("../../models/settings/serversettings.js")

module.exports = class warnchannelCommand extends Command {
    constructor (client){
        super(client, {
            name: "warnchannel", 
            description: "Set up warn logging", 
            group: "settings", 
            memberName: "warnchannelcommand", 
            userPermissions: ["ADMINISTRATOR"],
            args: [{
                type: "channel", 
                prompt: "Which channel do you want the warnings to be logged to?",
                key: "channel"
            }]
        })
    }

    async run (msg, {channel} ){

        //  serverID: {type: String, default: ""},
        //  serversettingsdb: {
        //         channel: {default: String, default: ""}, 
        //         enabled: {default: String, default: false}
        // }

        

        const g = await serversettingsdb.findOne({serverID: msg.guild.id})

        
        if(!g){
            new serversettingsdb({
                serverID: msg.guild.id,
                warnlogchannel: channel.id
            }).save().catch(() => {})
            msg.say(`Warnings will now be logged to ${channel}`).then(m => m.react(`✅`));
        }

        if(g){
           
            g.serverID = msg.guild.id,
            g.warnlogchannel = channel.id   
            
            g.save().catch(() => {});
            
            msg.say(`Warnings will now be logged to ${channel}`).then(m => m.react(`✅`));
        }

       


}
}