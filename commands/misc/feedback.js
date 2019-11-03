const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class feedbackCommand extends Command {
    constructor(client){
        super(client, {
            name: "feedback", 
            description: "Give feedback on Acrux, Be gentle!",
            group: "misc", 
            memberName: "feedbackcommand", 
            args: [{
                type: "string",
                prompt: "What feedback do you have? Be gentle!", 
                key: "feedback"
            }]
        })
    }
    async run(msg, {feedback}){

        let logChannel = this.client.channels.find(c => c.id === "637504583538573312")

        let embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(feedback)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        .addField(`Sent by`, `${msg.author} (${msg.author.id})`, true)


    if(feedback.length > 2048 ) msg.reply(`Shorten the feedback. It can not be longer than 2048 characters`)        
    
    logChannel.send(embed)
    msg.say(`Your feedback has been sent to the developer. We may contact you if we require more information.`)

    }
}