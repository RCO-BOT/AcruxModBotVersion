const mongoose = require("mongoose")

const giveawaySchema = mongoose.Schema({

        serverID: {type: String , default: ""},
        initiatorID: {type: String, default: "" }, 
        channelToPostTo: {type: String, default: ""},
        time: {type: String, default: ""},
        przes: {type: String, default: ""},
        takingPart: {type: String, default: ""}

})

module.exports = mongoose.model("Giveaway", giveawaySchema)