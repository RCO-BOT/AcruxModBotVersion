const {Command} = require("discord.js-commando")
const {RichEmbed} = require("discord.js")

module.exports = class addroleCommand extends Command {
    constructor(client){
        super(client, {
            name: "addrole",
            aliases: ["ar", "gr", "giverole"],
            group: "moderation",
            memberName: "addrole",
            description: "Gives a role to mentioned user", 
            userPermissions: ["MANAGE_ROLES"],
            args: [{
                type: "member", 
                prompt: "Which member are you giving a role to?",
                key: "member"
            },{
                type: "role", 
                prompt: "Which role are you giving?",
                key: "role"
            }]
        })
    }

    async run(msg, {member, role}){

        let logChannel = msg.guild.channels.find(c => c.name === "logs")
        let logmsg = ""
        if(!logChannel) logmsg = "I tried to log this but couldn't find a channel named `logs`"
        
        let uRoles = member.roles.filter(r => r.id != msg.guild.id).map(rn => rn.id)
        // if(!msg.member.me.hasPermission(["MANAGE_ROLES"])) msg.say("I don't have the `Manage Role` permission")

        if(member.roles.has(role.id)) return msg.say(`This user already has that role`)

        await member.addRole(role).catch(err => console.log(err));
        msg.say(`I gave ${member} the \`${role.name}\` role\n${logmsg}`)
        await logChannel.send(new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setDescription(`Role Added\n
        The ${role} role was given to ${member} by <@${msg.author.id}>`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter())
    }
}