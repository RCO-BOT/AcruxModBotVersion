const { Command } = require("discord.js-commando")
const { RichEmbed } = require("discord.js")

module.exports = class purgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: [`clear`],
            group: 'moderation',
            memberName: 'purgecommand',
            userPermissions: ["MANAGE_MESSAGES"],
            description: 'purges up to 100 messages',
            args: [{
                type: "integer", // Only allows numbers and sets the min to 1 and the max to 100, welcome to the world of d.js-commando :P
                prompt: "How many messages do you want to delete?",
                key: "amount",
                min: 1,
                max: 100 
            }]

        })
        
    }

     async run(msg, {amount}) {
            if(!msg.channel.permissionsFor(msg.guild.me).has("MANAGE_MESSAGES")) return msg.say(`I don't have manage messages permission in this channel`);
            let logChannel = msg.guild.channels.find(c => c.name === "logs")
            let logMsg = ""
            if(!logChannel) logMsg = "I tried to log this but I couldn't find a channel named `logs`"

             let messages = await msg.channel.bulkDelete(amount); // await the bulkDelete so you can use the 'messages.size' down below :P
             if(messages.size === 0) return msg.say(`No messages was cleared.`).then(m => m.delete(15000).catch(() => {})); // If 0 messages was cleared just have it post lol
             msg.reply(`Purged ${messages.size} messages. ${logMsg}`).then(m => m.delete(15000).catch(() => {}));
             if(logChannel){
                logChannel.send(new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setColor("RED")
            .setDescription(`Message Purge`)
            .setDescription(`<@${msg.author.id}> purged ${messages.size} messages from <#${msg.channel.id}>`)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL))
             }
            
        }
        
}