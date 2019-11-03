const {Command} = require("discord.js-commando")
const {RichEmbed}= require("discord.js")

const moment = require("moment")
require("moment-duration-format")

let coinModel = require("../../models/coins.js")

// console.log(moment().endOf('day').fromNow())

module.exports = class dailyCommand extends Command {
    constructor(client){
        super(client, {
            name: "daily", 
            description: "Collect daily coin reward", 
            group: "economy", 
            memberName: "dailycommand"
        })
    }

    async run(msg){


let c = await coinModel.findOne({userID: msg.author.id})

        if(!c){
            new coinModel({
                userID: msg.author.id, 
                balance: 100, 
                daily: {
                    claimable: true,
                    claimTime: ""
                }
            }).save().catch(() => {})
        }

        if(c){
            if(c.daily.claimTime != moment().format('L')){
                    
                function getNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                  }
                let ranNum = getNumber(1000, 5000)

                msg.say(`You claimed your daily and won ${ranNum}\nYou can spin again at midnight!`)

                c.daily.claimTime = moment().format("L")
                c.balance = Math.floor(Number(c.balance) + Math.floor(Number(ranNum)))
                
                c.save().catch(() => {})
            }else{
                
                msg.say(new RichEmbed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setDescription(`${msg.author}, You can't spin again until midnight!
                **${moment().endOf('day').fromNow()}**`)
                .setColor("RANDOM")
                .setThumbnail(msg.author.displayAvaterURL)
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL))

            }
        }
}
}