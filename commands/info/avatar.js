const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js")

module.exports = class AvatarCommand extends Command {
    constructor(client){
        super(client, {
            name: "avatar",
            aliases: ["pfp"],
            group: "info",
            memberName: 'avatar',
            description: 'Returns a link to a users display avatar',
            args: [
                 {
                     type:"user",
                     prompt:"Which user's avatar do you want?",
                     key: "user"
                 }
            ]
        })
    }
    run(msg, {user}) {

        let embed = new RichEmbed()
        .setTitle(`${user.tag}'s avatar`)
        .setImage(user.displayAvatarURL)

        msg.embed(embed)
    } 
}