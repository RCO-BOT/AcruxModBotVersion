const mongoose = require("mongoose")

const coinsModel = mongoose.Schema({

        userID: {type: String, default: ""},
        balance: {type: Number, default: 100},
        daily: {
                claimable: {type: Boolean, default: true}, 
                claimTime: {type: String, default: ""}
        }

})

module.exports = mongoose.model("Coins", coinsModel)