const { default: mongoose } = require("mongoose");


let AddProduct = mongoose.Schema({
    title:String,
    category:String,
    weight:String,
    weightUnit:String,
    image:String,
    description:String,
    code:String,
    SKU:String,
    status:String,
    regularPrice:String,
    salePrice:String
})

module.exports= mongoose.model("Product", AddProduct)