const mongoose = require("mongoose")

const serversettings = mongoose.Schema({
    
        serverID: {type: String, default: ""},
        warnlogchannel: {type: String, default: ""},
        messagelogchannel: {type: String, default: ""}, 
        joinleavechannel: {type: String, default: ""},
        serverupdateschannel: {type: String, default: ""}
      
})

module.exports = mongoose.model("serversettings", serversettings)