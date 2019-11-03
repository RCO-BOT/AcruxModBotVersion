const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const rpsmodel = require ("../../models/rps.js")

module.exports = class rpsstatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rpsstats",
            aliases: ["rpss"],
            description: "Get stats for your rps games", 
            group: "fun", 
            memberName: "rpsstatscommand",
            args: [{
                type: "member", 
                prompt: "Which member's rps stats do you want to view?", 
                key: "member"
            }]
        })
    }

    async run (msg, {member}){

        const s = await rpsmodel.findOne({userID: member.id})

        if(member.user.bot) return msg.say(`Bots can't play RPS`)

        if(!s) return msg.say(`${member.user.username} has no RPS stats`)

        if(s){
            msg.say(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`${member.user.username}'s RPS stats!\n
            Games played: ${s.gamesPlayed} | Score: ${s.score}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
        }

    }
}