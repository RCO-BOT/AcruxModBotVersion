const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const coinModel = require("../../models/coins.js")

module.exports = class balanceCommand extends Command {
    constructor(client){
        super(client, {
            name: "balance", 
            description: "Check your coin balace",
            aliases: ["bal"],
            group: "economy", 
            memberName: "balancecommand", 
        })
    }

    async run (msg){

        const c = await coinModel.findOne({userID: msg.author.id})

        if(!c){
            new coinModel({
                userID: msg.author.id,
                balance: 100
            }).save().catch(() => {})

            msg.reply(`This is your first time using the economy command.. Let me just make the database entry for you! Run that command again 😇`)


        }

        if(c){
            msg.say(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`${msg.author.username}, You have ${c.balance} coins`)
            .setThumbnail(msg.author.displayAvatarURL)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
        }

    }
}