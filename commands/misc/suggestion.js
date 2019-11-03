const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class suggestionCommand extends Command {
    constructor(client){
        super(client, {
            name: "suggestion", 
            description: "Suggest a new feature for Acrux",
            group: "misc", 
            memberName: "suggestioncommand", 
            args: [{
                type: "string",
                prompt: "What would you like to suggest?", 
                key: "suggestion"
            }]
        })
    }
    async run(msg, {suggestion}){

        let logChannel = this.client.channels.find(c => c.id === "637504583538573312")

        let embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(suggestion)
        .setColor("DARK_VIVID_PINK")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`Sent by`, `${msg.author} (${msg.author.id})`, true)


    if(suggestion.length > 2048 ) msg.reply(`Shorten the suggestion. It can not be longer than 2048 characters`)        
    
    logChannel.send(embed)
    msg.say(`Your suggestion has been sent to the developer. We may contact you if we require more information.`)

    }
}