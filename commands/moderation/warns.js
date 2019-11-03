const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const mongoose = require("mongoose")
const moment = require("moment")
require("moment-duration-format")

let warndb = require("../../models/warn.js")

module.exports = class warnsCommand extends Command{
    constructor(client){
        super(client, {
            name: "warns",
            description: "Fetch a list of a member's server warns",
            group: "moderation", 
            memberName: "warnscommand",
            userPermissions: ["KICK_MEMBERS"],
            args: [{
              key: "member", 
              prompt: "what user?", 
              type: "member", 
            }]
        })
    }
    async run(msg, {member}){

        let g = await warndb.find({userID: member.id})

        let warnArray = []
       
        await g.forEach(function(warn, index){ // This will basically map them all out
          warnArray.push(`${index + 1}: \`${warn.reason}\` - Warned by: ${warn.warnedBy}
          Date: ${warn.time}\n`)
         })

         if(warnArray.length < 1){
             msg.say(`This user has no warnings`)
         } else {
             msg.say(new RichEmbed()
            .setColor(msg.member.displayColor)
            .setTitle(`Warnings for: ${member.user.username}`)
            .setDescription(warnArray)) 
         }
           
    }
}