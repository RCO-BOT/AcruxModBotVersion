const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const mongoose = require("mongoose")

const serversettingsdb = require("../../models/settings/serversettings.js")

module.exports = class messagechannelCommand extends Command {
    constructor (client){
        super(client, {
            name: "messagechannel", 
            description: "Set up warn logging", 
            group: "settings", 
            memberName: "messagechannelcommand", 
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
                messagelogchannel: channel.id
            }).save().catch(() => {})
            msg.say(`Message delete/edit will now be logged to ${channel}`).then(m => m.react(`✅`));
        }

        if(g){
           
            g.serverID = msg.guild.id,
            g.messagelogchannel = channel.id   
            
            g.save().catch(() => {});
            
            msg.say(`Message delete/edit will now be logged to ${channel}`).then(m => m.react(`✅`));
        }

       


}
}