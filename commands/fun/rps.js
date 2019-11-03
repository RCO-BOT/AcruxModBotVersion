const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

const rpsmodel = require("../../models/rps.js")

module.exports = class rpsCommand extends Command {
    constructor(client){
        super(client, {
            name: "rps", 
            description: "Rock Paper Scissors vs bot", 
            group: "fun", 
            memberName: "rpscommand",  
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                type: "string", 
                prompt: "`Rock`, `Paper` or `Scissors`?", 
                key: "choice"
            }]
        })
    }

    async run(msg, {choice}){

        if(msg.channel.type === "dm") return msg.say(`This command is disabled in DMs`)

       const rps = await rpsmodel.findOne({userID: msg.author.id}) 

       if(!rps){
           new rpsmodel({
               userID: msg.author.id, 
               score: 0, 
               gamesPlayed: 1
           })
       }

        
        let possibles = ["rock", "paper", "scissors"]

        if(!possibles.includes(choice.toLowerCase())) msg.say("Please choose `Rock`, `Paper` or `Scissors`")

        let botChoice = possibles[Math.floor(Math.random() * possibles.length)]

        let winsmsg = "You lost! **- 1**"


        
        if(!rps){
            new rpsmodel({
                userID: msg.author.id, 
                score: 0, 
                gamesPlayed: 0
            }).save().catch(() => {})
        }

        

        if(choice === "rock" && botChoice === "scissors"){  
            winsmsg = "You won! **+ 1**"
            msg.say(`You chose: ${choice.toLowerCase()} | Acrux chose: ${botChoice}\n${winsmsg}`)

            if(rps){
                rps.serverID = msg.author.id,
                rps.score = rps.score + 1,
                rps.gamesPlayed = rps.gamesPlayed + 1

                rps.save().catch(() => {})
            }


        }else if(choice === "paper" && botChoice === "rock"){
            winsmsg = "You won! **+ 1**"
            msg.say(`You chose: ${choice.toLowerCase()} | Acrux chose: ${botChoice}\n${winsmsg}`)

            if(rps){
                rps.serverID = msg.author.id,
                rps.score = rps.score + 1,
                rps.gamesPlayed = rps.gamesPlayed + 1

                rps.save().catch(() => {})
            }


        } else if(choice === botChoice){
            winsmsg = "You drew"
            msg.say(`You chose: ${choice.toLowerCase()} | Acrux chose: ${botChoice}\n${winsmsg}`)

            if(rps){
                rps.serverID = msg.author.id,
                rps.score = rps.score,
                rps.gamesPlayed = rps.gamesPlayed + 1

                rps.save().catch(() => {})
            } else{
                if(rps){
                    rps.serverID = msg.author.id,
                    rps.score = rps.score - 1,
                    rps.gamesPlayed = rps.gamesPlayed + 1
    
                    rps.save().catch(() => {})
                }
            }
            
                

            

        }

  
    
    }
}