const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const mongoose = require("mongoose")
const moment = require("moment")
require("moment-duration-format")

const Warn = require("../../models/warn.js")
const serversetting = require("../../models/settings/serversettings.js")


module.exports = class warnCommand extends Command {
    constructor(client){
        super(client, {
            name: "warn", 
            aliases: [],
            description: "Warn a user", 
            group: "moderation", 
            memberName: "warncommand", 
            userPermissions: ["KICK_MEMBERS"],
            args: [{
                type: "member", 
                prompt: "Who do you want to warn?", 
                key: "member" 
            }, {
                type: "string", 
                prompt: "What is the reason?", 
                key: "reason"
            }]
        })
    }

    async run(msg, {member, reason}){

     

        const g = await Warn.findOne({serverID: msg.guild.id})
        const s = await serversetting.findOne({serverID: msg.guild.id})
        

        let logchannel = s.warnlogchannel

        console.log(logchannel)

        

        if(!g && !member.user.bot && member.id !== msg.author.id){
            let warn = new Warn({
                userID: member.id, 
                username: member.user.tag, 
                reason: reason, 
                warnedBy: msg.author.tag, 
                warnedByID: msg.author.id, 
                time: moment(msg.createdAt).format(`lll`)
            }).save().catch(() => {})
    
        }

        if(g && !member.user.bot && member.id !== msg.author.id){
            g.userID = member.id
            g.username = member.user.tag,
            reason = reason,
            warnedBy = msg.author.tag,
            warnedByID = msg.author.id,
            time = msg.createdAt
            
            g.save().catch(() => {})
        }


        if(!member.user.bot && member.id !== msg.author.id){
        
            member.send(`You have been reported in ${msg.guild.name} for the the following reason: ${reason}`)
            msg.say(`${member.user.username} has been warned`)

            if(!logchannel)msg.say(`Warning was saved but you've not set a channel to log to.`)
           
            if(logchannel)msg.guild.channels.get(logchannel).send(new RichEmbed()

            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`User warned\n
            ${member} was warned by <@${msg.author.id}> for the following reason: ${reason}`)
            .setColor("RED")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL))

        } else if(member.user.bot){
            msg.say(`Bot's can't be warned`)
        }else if(member.id === msg.author.id) msg.say(`You can't warn yourself`)




        

    }
}