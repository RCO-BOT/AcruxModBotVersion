const {
  Command
} = require('discord.js-commando');
const {
  RichEmbed
} = require("discord.js")

module.exports = class testCommand extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      description: "test",
      group: "owner",
      memberName: "testcommand",
      aliases: ["t"],
      group: "owner",
      args: [{
        type: "integer", 
        prompt: "How many?",
        key: "amount"
      }]
      

    })
  }

  async run(msg, {amount}) {

    let takingPart = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let randomTakingPartArray = []
    let winners = []
 
    let randomTakingPartFunction = function(){
      for(let i = 0; i < amount; i++){
     
        //Gnerates list of random users from array  
        let list = takingPart[Math.floor(Math.random() * takingPart.length)]

        //Push list to empty array
        randomTakingPartArray.push(list)
      }  

      //Remove duplicates from randomTakingPartArray
      let removeDupes = new Set (randomTakingPartArray)

      //Convert back to array
      winners = [...removeDupes]
      
    }

    randomTakingPartFunction()
    msg.say(`Winners: ${winners}`)


//Command structure = !startGiveaway <amount of winners>

//winners will house the final list of winners.

// Generates random numbers from takingPart array and removes duplicates and pushes to winners array
//  winners.length needs to be === amount
// At the moment when winners is posted and duplicates are found it removes the duplicate values.   
  
  }
}