const mongoose = require("mongoose")

const rpsmodel = mongoose.Schema({

    userID: {type: String, default: ""}, 
    score: {type: Number, default: 0}, 
    gamesPlayed: {type: Number, default: 0}


})

module.exports = mongoose.model("RPS Leaderboard", rpsmodel)