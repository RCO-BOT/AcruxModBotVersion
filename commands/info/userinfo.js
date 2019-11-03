const {
    Command
} = require("discord.js-commando");
const {
    RichEmbed
} = require("discord.js")

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            aliases: ['wi', 'whois', 'ui'],
            group: 'info',
            memberName: 'userinfo',
            description: 'Returns information for mentioned user',
            args: [{
                type: "member",
                prompt: "Which member's info do you want to view?",
                key: "member"
            }]
        })
    }
    run(msg, {
        member
    }) {

        //!Is bot variable 
        let isBot

        if (member.user.bot) {
            isBot = "BOT 🤖 "
        } else {
            isBot = "USER "
        }

        let embedColor
        if (member.presence.status === "online") embedColor = "GREEN"
        if (member.presence.status === "idle") embedColor = "ORANGE"
        if (member.presence.status === "dnd") embedColor = "RED"
        if (member.presence.status === "offline") embedColor = "GREY"

        let devices = [];
        let status = member.user.presence.clientStatus
        if (!member.user.presence.clientStatus) status = " "
        if (!status.desktop || status.web || status.mobile) devices.push(" ")
        if (status.desktop) devices.push("Desktop 💻 ")
        if (status.web) devices.push("Web 🕸 ")
        if (status.mobile) devices.push("Mobile 📱 ")

        let createdDate = member.user.createdAt.toLocaleDateString()
        let createdTime = member.user.createdAt.toLocaleTimeString()

        let uRoles = member.roles.sort((a, b) => b.position - a.position).filter(r => r.id != msg.guild.id).map(c => c).join(' | ')

        //!If user is set to offline it displays blank
        let deviceMessage

        if(member.presence.status !== "offline") deviceMessage = ` Active on: ${devices}`
        if(member.presence.status === "offline") deviceMessage = " "

        //!User status message
        let statusMessage
        if(member.presence.status === "online") statusMessage = "Online 🟢"
        if(member.presence.status === "idle") statusMessage = "Idle 🟠"
        if(member.presence.status === "dnd") statusMessage = "DnD 🔴"
        if(member.presence.status === "offline") statusMessage = "Offline ⚫"


        let embed = new RichEmbed()
            .setAuthor(`User information for` + ` ${member.user.username} `, member.user.displayAvatarURL)
            .setDescription(` Full Tag: <@${member.user.id}>\n  ID: ${member.user.id}
            [Avatar Link](${member.user.displayAvatarURL})

                 Account Type: ${isBot} ${deviceMessage}
                 Status: ${statusMessage}
                

                 Account created on: ${createdDate} at ${createdTime}
                \n
                 Roles: ${uRoles}`)

            .setThumbnail(member.user.displayAvatarURL)
            .setColor(embedColor)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL)

        msg.embed(embed)




    }

}