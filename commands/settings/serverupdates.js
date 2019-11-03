const {Command} = require("discord.js-commando")

const serversettings = require("../../models/settings/serversettings.js")

module.exports = class serverupdatesCommand extends Command {
    constructor(client){
        super(client, {
            name: "serverupdates",
            description: "Sets server updates log channel",
            memberName: "serverupdatescommand",
            group: "settings", 
            args: [{
                type: "channel", 
                prompt: "Which channel would you like server updates to log to?",
                key: "channel"
            }]
        })
    }

    async run(msg, {channel}){

        const s = await serversettings.findOne({serverID: msg.guild.id})

        if(!s){
            new serversettings({
               serverID: msg.guild.id,
               serverupdateschannel: channel.id
            }).save().catch(() => {})

            msg.say(`Server updates will now be logged to ${channel}`).then(m => m.react(`✅`));
        }

        if(s){
            s.serverID = msg.guild.id
            s.serverupdateschannel = channel.id
            s.save().catch(() => {})

            msg.say(`Server updates will now be logged to ${channel}`).then(m => m.react(`✅`));
        }


    }

}