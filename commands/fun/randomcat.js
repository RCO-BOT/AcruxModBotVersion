const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")
const randomCat = require('random.cat.js');
const randomCatApi = randomCat.api();

module.exports = class randomcatcommand extends Command{
    constructor(client){
        super(client, {
            name: "randomcat", 
            aliases: ["rc"],
            group: "fun",
            memberName: "randomcat",
            description: "Posts a random cat image"

        })
    }

    run(msg){
       let img = randomCatApi.getCat().then((cat) => msg.say(new RichEmbed()
       .setImage(cat.file)
       .setDescription(`[Random Cat](${cat.file})`)
       .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
       .setColor("RANDOM")
       .setTimestamp()
       .setFooter(this.client.user.username, this.client.user.displayAvatarURL)))

     

        
    }
}