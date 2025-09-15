const { default: mongoose } = require("mongoose");

let ourusers=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

module.exports= mongoose.model("users",ourusers)
