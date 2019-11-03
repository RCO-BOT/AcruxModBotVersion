const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const coinModel = require("../../models/coins.js")

module.exports = class betCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bet",
            description: "If you win, Your bet is doubled. If you lose, You lose your bet",
            group: "economy",
            memberName: "betcommand",
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                type: "integer", 
                prompt: "How much do you want to bet?",
                key: "amount"
            }]
        })
    }

    async run (msg, {amount}){

        const c = await coinModel.findOne({userID: msg.author.id})

        const winlose = ["win", "lose"]
        const res = winlose[Math.floor(Math.random () * winlose.length)]

        

        if(!c){
            new coinModel({
                userID: msg.author.id,
                balance: 100
            }).save().catch(() => {})

            msg.reply(`This is your first time using the economy command.. Let me just make the database entry for you! Run that command again 😇`)
        }

        if(c){

            if(res === "win"){
                c.balance = c.balance + (amount * 2)
                c.save().catch(() => {})
            
                msg.say(new RichEmbed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setDescription(`You won ${amount * 2} coins.\n
                Your balance is now ${c.balance}`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL))

            }else{
                c.balance = c.balance - amount
                c.save().catch(() => {})

                msg.say(new RichEmbed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setDescription(`You lost ${amount} coins.\n
                Your balance is now ${c.balance}`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
            }

 

        }


    }
}