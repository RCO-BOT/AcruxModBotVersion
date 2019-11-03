const {Command} = require("discord.js-commando")

const mongoose = require("mongoose")

const serversettings = require("../../models/settings/serversettings.js")

module.exports = class jjoinleavechannelCommand extends Command {
    constructor(client){
        super(client, {
            name: "joinleavechannel", 
            group: "settings",
            description: "Set join/leave log channel", 
            memberName: "joinleavechannelcommand", 
            userPermissions: ["KICK_MEMBERS"], 
            args: [{
                type: "channel", 
                prompt: "Which channel do you want member join/leave to log to?", 
                key: "channel"
            }]
        })
    
    }

    async run(msg, {channel}){
        
            const s = await serversettings.findOne({serverID: msg.guild.id})

            if(!s){
                new serversettings({
                    serverID: msg.guild.id, 
                    joinleavechannel: channel.id
                }).save().catch(() => {})
                msg.say(`Join/Leave will now log to ${channel}`)
            }

            if(s){
                s.serverID = msg.guild.id
                s.joinleavechannel = channel.id

                s.save().catch(() => {})

                msg.say(`Join/Leave will now log to ${channel}`)
            }


    }
}