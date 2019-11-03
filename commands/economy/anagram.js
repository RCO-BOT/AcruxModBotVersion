const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const stringShuffle = require("string-shuffle");

const coinsModel = require("../../models/coins.js")

module.exports = class anagramCommand extends Command {
    constructor(client){
        super(client, {
            name: "anagram", 
            description: "Anagram",
            group: "economy",
            memberName: "anagramcommand",
           
        })
    }

    async run (msg){

        const words = ["floor", "appreciate", "recognize", "have", "announcement", "television", "hole", "scholar", "packet",
         "resident", "pull", "tragedy", "glance", "compact", "mean", "knife", "pursuit", "pump", "biscuit", "auction", "treat",
          "attract", "employ", "wreck", "uncertainty", "rumor", "formal", "noble", "jest", "original", "cover", "ballet", "smell",
           "bond", "reflect", "loud", "ignorant", "bread", "faint", "glass", "room", "disorder", "hall", "morning", "connection",
            "innocent", "convict", "suggest", "film", "minimum", "course", "favorable", "slot", "record", "torch", "minor", "dairy",
             "thank", "pen", "allocation", "qualified", "sister", "tower", "spirit", "protection", "see", "transaction", "harmony", 
             "precedent"]

        let ranWord = words[Math.floor(Math.random() * words.length)]

        
        await msg.say(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`Your anagram is **${stringShuffle(ranWord)}**\n\nYou have 30 seconds to guess!\nMake sure to type \`answer\` before your answer else it won't count!\n eg: \`answer dog\``)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
        const guesses = await msg.channel.awaitMessages(m => {
             m.content === `answer ${ranWord}`
            m.content.startsWith(`answer`) ? m.react(`👌`) : null

        }, {time: 30000})

        let winners = guesses.map(m => m.author.username).join("\n")

        let msgToSend = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(winners.length <1 ? `Times up! The answer was ${ranWord}. No one won!` : `Times up! The answer was ${ranWord}. Winner:\n${winners} `)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)


        msg.channel.send(msgToSend)
            
    }

}
