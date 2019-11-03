const {Command} = require("discord.js-commando")
const  {RichEmbed} = require("discord.js")

module.exports = class randomnumberCommand extends Command {
    constructor(client){
        super(client, {
            name: "randomnumber", 
            aliases:[], 
            group: "fun", 
            memberName: "randomnumbercommand",
            description: "Generate a random number between two given numbers", 
            args: [{
                type: "integer", 
                prompt: "Lowest number?", 
                key: "low"
            },{
                type: "integer", 
                prompt: "Highest number?", 
                key: "high"
            }]

        })
        
    }
    async run(msg, {low, high}){
        
        let numberToGen = [Math.floor(Math.random() * high - low)] 
        msg.say(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`${msg.author.username} your random number between ${low} & ${high} is:`)
        .addField(`\u200b`, `\u200b`, true)
        .addField(`**${numberToGen}**`, `\u200b`, true)
        .addField(`\u200b`, `\u200b`, true)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    }
}