const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class createroleCommand extends Command{
    constructor(client){
        super(client, {
            name: "createrole", 
            aliases: ["cr"],
            group: "moderation", 
            memberName: "createrolecommand",
            description: "Create a role",
            userPermissions: ["MANAGE_ROLES"],
            args: [{
                type: "string", 
                prompt: "What are you calling the new role? [MAKE SURE YOU AND THE BOT HAVE THE `MANAGE_ROLES` permissio]",
                key: "name"
            }, {
                type: "string", 
                prompt: "What colour?", 
                key: "colour"
            },{
                type: "boolean", 
                prompt: "Hoisted?",
                key: "toHoist"
            },{
                type: "boolean",
                prompt: "Mentionable?",
                key: "isMentionable"
            }]

        })
    }

    async run(msg, {name, colour, toHoist, isMentionable}){
        // let sRoles = msg.guild.roles.map(r => r.name).join(" | ")

        if(!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.say("I don't have the manage roles permissions")

        msg.guild.createRole({
            name: name,
            color: colour.toUpperCase(), 
            hoist: toHoist,
            mentionable: isMentionable
        })

        msg.reply(`Created a new role called ${name} with the colour ${colour}`)
        
    }
}