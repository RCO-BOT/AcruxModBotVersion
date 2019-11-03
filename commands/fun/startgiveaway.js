const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const mongoose = require("mongoose")

const giveawayDB = require("../../models/giveaway.js")


// serverID: {type: String , default: ""},
//         initiatorID: {type: String, default: "" }, 
//         channelToPostTo: {type: String, default: ""},
//         time: {type: String, default: ""},
//         przes: {type: String, default: ""},
//         takingPart: {type: String, default: ""}

module.exports = class giveawayCommand  extends Command {
    constructor(client) {
      super(client, {
          name: "giveaway",
          aliases: ["startgiveaway"], 
          description: "Starts a giveaway",
          group: "fun", 
          memberName: "giveawaycommand",
          args: [{
              type: "channel", 
              prompt: "What channel do you want to post this to?", 
              key: "postChannel"
          },{
              type: "integer",
              prompt: "How long should the giveaway last for?",
              key: "time"
          }, {
              type: "string", 
              prompt: "What's being given?", 
              key: "prizes"
          }]

      })
    } 
  
    //!giveAway
   
    async run(msg, {postChannel, time, prizes}) {

        //! DONT DELETE
  //  for(let i = 0; i < amount; i++){

  //   let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  //   let winners = nums[Math.floor(Math.random() * nums.length)]
  //   msg.say(winners)
  // }
  //! DONT DELETE
  
        msg.channel.send(`Ok, ${msg.author}, The giveaway will post to ${postChannel}, last for ${time} and the prize given is ${prizes}`)
        
        postChannel.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`GIVEAWAY!\n
        A new giveaway posted by ${msg.author}\n
        Prize\n ${prizes}\n\n
        The giveaway will end in ${time}`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
    }
  }