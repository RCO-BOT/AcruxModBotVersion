const { Client } = require("discord.js-commando")
const path = require("path")
const { config } = require("dotenv")
const { RichEmbed } = require("discord.js")
const mongoose = require('mongoose')

const fs = require("fs")

const ddiff = require("return-deep-diff")

const serversettings = require("./models/settings/serversettings.js")


mongoose.connect(process.env.MONGODB, {keepAlive: true, useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true})


 
const client = new Client({
    commandPrefix: '!', 
    owner: '248947473161256972',
    invite: 'https://discord.gg/eCtANM2'
})

client.registry
.registerDefaultTypes()
.registerGroups([
    ['info', 'Info'],
    ['moderation', 'Moderation'],
    ['owner', 'Owner'],
    ['fun', 'Fun'],
    ['music', 'Music'],
    ['misc', 'Misc'],
    ['settings', 'Settings'],
    ['economy', 'Economy']
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'))

config({
    path: __dirname + "/.env"
});

global.servers = {};

client.once('ready', () => {

    console.log(`Logged in as ${client.user.tag}(${client.user.id})`)
    client.user.setActivity('Being developed')

    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" > " + guild.name + " - " + guild.id)
    })

    
});

client.on("guildCreate", async guild =>{

    const s = await serversettings.findOne({serverID: guild.id})

    if(!s){

        new serversettings({
            serverID: guild.id
        }).save().catch(() => {})

       console.log(`Joined ${guild} and created a settings database`) 
    } 

    if(s) console.log(`Joined ${guild} and a settings database already existed`)

        let embed = new RichEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`Joined a new server`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .addField(`Server name: `, guild.name, true)
        .addField(`Guild ID: `, guild.id, true)
        .addField(`Member count: `, guild.members.size)

        client.channels.get("636808231561199626").send(embed).catch(() => {});
})

client.on("guildDelete", async guild =>{

    const s = await serversettings.findOne({serverID: guild.id})

    if(!s){

        console.log(`Left ${guild} and they had no database to delete`)

    } 

    if(s){
        const s = await serversettings.findOneAndDelete({serverID: guild.id})
        console.log(`Left ${guild} deleted their database`)
    } 


    let embed = new RichEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`Left a server`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .addField(`Server name: `, guild.name, true)
        .addField(`Guild ID: `, guild.id, true)
        .addField(`Member count: `, guild.members.size)

        client.channels.get("636808231561199626").send(embed).catch(() => {});  
})


//!guildMemberAdd

client.on("guildMemberAdd", async member => {
    const s = await serversettings.findOne({serverID: member.guild.id})

    if(!s || s.joinleavechannel === "") return

    if(s.joinleavechannel !== "" ){
        member.guild.channels.get(s.joinleavechannel).send(new RichEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${member} joined.`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL))
    }
})

//!guildMemberRemove

client.on("guildMemberRemove", async member => {
    const s = await serversettings.findOne({serverID: member.guild.id})

    if(!s || s.joinleavechannel === "") return

    if(s.joinleavechannel !== "" ){
        member.guild.channels.get(s.joinleavechannel).send(new RichEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${member} left.`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL))
    }
})

// //!guildMemberUpdate 

// client.audit = async (guild, type) => {
//     let audit = await guild.fetchAuditLogs({type: type})
//     return audit.entries.first()
// };

// //!Username/Nickname change
// client.on("guildMemberUpdate", async (oldMember, newMember) =>{
// // if(oldMember.nickname === newMember.nickname) return null; // If you only want to log nicknames
// let s = await serversettings.findOne({serverID: oldMember.guild.id});
// if(!s) return null; 

// let logchannel = s.serverupdateschannel

// // To fetch the audit logs use, Example for channel create.
// if(oldMember.guild.me.hasPermission("VIEW_AUDIT_LOG")){ // Check for this permission so the bot doesn't send you a shit ton of errors
// let info = await client.audit(oldMember.guild, "MEMBER_UPDATE"); // correct one lmao
// if(info){ // to get the 'mod' who created the channel use: `info.executor` (executor is the user object for the 'mod')

// if(!logchannel && !oldMember.user.bot) return
// if(logchannel) await oldMember.guild.channels.get(logchannel).send(new RichEmbed()
// .setAuthor(client.user.username, client.user.displayAvatarURL)
// .setDescription(`Member Update\n
// ${info.executor} Updated ${oldMember}'s name\n
// Old: ${oldMember.nickname || oldMember.user.username}\n
// New: ${newMember.nickname  || newMember.user.username}`)
// .setTimestamp()
// .setColor("RANDOM")
// .setFooter(client.user.username, client.user.displayAvatarURL))

// }
// }

// //! roleAdd

// if(oldMember.roles === newMember.roles ? null : console.log(newMember.changes) );

// })



client.on(`error`, console.error)
client.login(process.env.TOKEN)
