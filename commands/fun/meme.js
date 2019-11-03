const {
    Command
} = require("discord.js-commando")
const {
    RichEmbed
} = require("discord.js")

const randomPuppy = require("random-puppy")


module.exports = class memeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            aliases: [`memes`],
            group: 'fun',
            memberName: 'memecommand',
            description: 'Posts a random meme',

        })

    }

    async run(msg, {
        
    }) {

        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        msg.say(new RichEmbed()
        .setDescription("DANK MEME")
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setColor("RANDOM")
        .setImage(img)
        .addField(`\u200b`, `[Meme Link](${img})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    }



}