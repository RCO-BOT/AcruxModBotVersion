const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class deleteroleCommand extends Command{
    constructor(client){
        super(client, {
            name: "deleterole", 
            aliases: ["dr"],
            group: "moderation", 
            memberName: "deleterolecommand",
            description: "Deletes a role",
            userPermissions: ["MANAGE_ROLES"],
            args: [{
                type: "string",
                prompt: "What role do you want to delete?", 
                key: "name"
            }]

        })
    }

    async run(msg, {name}){
        // let sRoles = msg.guild.roles.map(r => r.name).join(" | ")

        if(!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.say("I don't have the manage roles permissions")

        let roleToDelete = msg.guild.roles.find(r => r.name === name)

        if(!roleToDelete) msg.reply(`I can't find a role named ${name}`)
        if(roleToDelete) roleToDelete.delete().then(msg.reply(`Deleted the role called ${name}`))
        
    }
}