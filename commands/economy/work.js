const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const coinsModel = require("../../models/coins.js")

module.exports = class workCommand extends Command {
    constructor(client){
        super(client, {
            name: "work", 
            description: "Best way to earn coins",
            group: "economy",
            memberName: "workcommand",
            throttling: {
                usages: 1,
                duration: 5
            },
        })
    }

    async run(msg){

        const c = await coinsModel.findOne({userID: msg.author.id})

        if(!c){
            new coinsModel({
                userID: msg.author.id,
                balance: 100
            }).save().catch(() => {})

            msg.reply(`This is your first time using the economy command.. Let me just make the database entry for you! Run that command again 😇`)
        }

        if(c){

            //! you wokred at <job> and <(you broke the ice cream machine and was ordered to pay for repairs)> <(You gained/lost)>

            const jobs = ["Google", "Discord", "KFC", "McDonalds"]

            const minIncome = 30
            const maxIncome = 200

            const rJob = jobs[Math.floor(Math.random() * jobs.length)]
            const income = Math.floor(Math.random() * (maxIncome - minIncome) + minIncome)

            c.balance = c.balance + income
            c.save().catch(() => {})

            msg.say(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`${msg.author.username}, You worked at ${rJob} and gained ${income}\n
            Your new balance is ${c.balance}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL))


        }


        


    }
}   