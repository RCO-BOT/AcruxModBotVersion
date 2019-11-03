const mongoose = require("mongoose")

const WarnsSchema = mongoose.Schema({
    
        userID: {type: String, default: ""},
        username: {type: String, default: ""},
        reason: {type: String, default: ""}, 
        warnedBy: {type: String, default: ""}, 
        warnedByID: {type: String, default: ""}, 
        time: {type: String, default: ""}
   
    

})

module.exports = mongoose.model("Warns", WarnsSchema)