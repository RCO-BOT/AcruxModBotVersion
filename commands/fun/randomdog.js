const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const {get} = require("superagent");

module.exports = class randomcatCommand extends Command {
    constructor(client) {
        super(client, {
            name: "randomdog", 
            description: "Posts a random picture of a dog", 
            group: "fun", 
            memberName: "randomdogcommand", 
        })
    }

    async run(msg){
       let {body: dog} = await get(`https://dog.ceo/api/breeds/image/random`);
       if(dog.status !== "success") return msg.say({embed: {title: `:x: Error while trying to fetch a dog photo :(`, color: 0xFF0000}})
       msg.say(new RichEmbed ()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`Random Dog - [Image Link](${dog.message}) `)
        .setImage(dog.message)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    }
}