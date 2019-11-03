const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")


module.exports = class randomcatcommand extends Command{
    constructor(client){
        super(client, {
            name: "flipcoin", 
            aliases: ["coinflip", "fc"],
            group: "fun",
            memberName: "flipcoin",
            description: "Flips a coin - Heads or Tails"

        })
    }

    async run(msg){

        const hCoin = "https://cdn.discordapp.com/attachments/636976322819653652/636976911394013204/heads.png"
        const tCoin = "https://cdn.discordapp.com/attachments/636976322819653652/636976911645671467/tails.jpg"
       
    let hot = ["HEADS", "TAILS"]
    let flip = hot[Math.floor(Math.random() * hot.length)]
        
    let img = hCoin
    if(flip === "TAILS") img = tCoin
    
    msg.say(new RichEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
    .setImage(img)
    .setDescription(flip))
        
    }
}