const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")
const quotesGo = require("quotes-go")

module.exports = class randomquoteCommand extends Command{
    constructor(client){
        super(client, {
            name: "randomquote",
            aliases: ["rq", "quote"],
            group: "fun",
            memberName: "randomquote", 
            description: "Posts a random quote",

        })
    }

    run(msg){
        

        let rq = quotesGo.getRandomQuote()

        msg.say(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`${rq.text}\n
        - ${rq.author.name} (${rq.author.shortDesc})`)
        .setImage(rq.author.avatar)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .setColor("RANDOM"))
    }
}