const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const gifSearch = require("gif-search")

module.exports = class gifSearchCommand extends Command {
    constructor(client){
        super(client, {
            name: "gifsearch", 
            aliases: ["gs"],
            group: "fun", 
            memberName: "gifsearch",
            description: "Search for a gif",
            args: [{
                type: "string", 
                prompt: "What gif are you searching for?", 
                key: "searchTerm"
            }]
        })
    }

    run(msg, {searchTerm}){
        
        let gifToSearch = gifSearch.random(searchTerm).then(
            gifUrl => msg.say(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`Random [GIF](${gifUrl})`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
            .setImage(gifUrl))
        );

    }

}