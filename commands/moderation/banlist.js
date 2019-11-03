const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class banCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'banlist',
            aliases: [],
            group: 'moderation',
            memberName: 'banlistcommand',
            description: 'lists banned users'
        })
    }

    async run(msg, {member}) {

        if(!msg.member.hasPermission(['BAN_MEMBERS'])){
          msg.reply(`You don't have permission to use this command`)  
        } else {
            msg.guild.fetchBans().then(banned => {
                let banlist = banned.map(u => u.tag).join(`\n`)
    
                msg.say(banlist)
            
            })
        }
        
       
    
    }

}