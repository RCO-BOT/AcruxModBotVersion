const {Command} = require("discord.js-commando")

module.exports = class shoutCommand extends Command {
    constructor(client){
        super(client, {
            name: "shout",
            group: "owner", 
            memberName: "shoutcommand",
            description: "", 
            args: [{
                type: "string", 
                prompt: "content..?", 
                key: "content"
            }]
        })
    }

    async run (msg, {content}){
       if(msg.author.id !== "248947473161256972"){
           return
       } else {
           this.client.guilds.forEach(e => e.channels.find(c => c.name === "lobby" || c.name === "general").send(content))
       }
}
}