express=require("express")


app=express()


app.listen(5000,()=>{
    console.log("server start")
})

// cors ------------
const cors=require("cors")
app.use(cors())


// import schema------------
const Users=require("./models/Users") 
const Product = require("./models/Product")




// bodyparser ---------------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))


// mongoose ----------------
const {mongoose } = require("mongoose")
mongoose.connect("mongodb://localhost:27017/freshcart").then(()=>{
    console.log("mongodb connect..........")
}).catch((err)=>{
     console.log(err)
})



// signup---------------
app.post("/signup",async(req,res)=>{
    // console.log(req.body)
    let user=req.body.formData
    let result=await Users.insertOne({
        firstname:user.firstname,
        lastname:user.lastname,
        email : user.email ,
        password: user.password
    })

    let finaluser=await result.save()

    if(finaluser){
        res.json({
            status:true
        })
    }
    else{
        res.json({
            status:false
        })
    }

}) 

// allusers-------------------
app.get("/allusers",async(req,res)=>{
     let result=await Users.find({})
     if(result){
        res.json({
            status:true,
            ourusers:result
        })
    }
    else{
        res.json({
            status:false
        })
    }
})






//// signin 
app.post("/signin",async(req,res)=>{
    let ouruser=req.body.loginData
    let result=await Users.findOne({"email":ouruser.email,"password":ouruser.password})
    if(result){
        res.json({
            status:true,
            loginuser:result
        })
    }
    else{
        res.json({
            status:false
        })
    }
})


// reset
app.post("/reset", async(req,res)=>{
   let resetuser = req.body.resetData
   let result = await Users.findOneAndUpdate({"email":resetuser.email } ,{$set:{"password":resetuser.password}})
    if(result){
        res.json({
            status:true,
            resetData:result
        })
    }
    else{
        res.json({
            status:false
        })
    }
   })


///add Product Data

app.post("/addproduct", async(req,res)=>{
    let product = req.body.productData
    let result= await Product.insertOne({
    title:product.title,
    category:product.category,
    weight:product.weight,
    weightUnit:product.weightUnit,
    image:product.image,
    description:product.description,
    code:product.code,
    SKU:product.SKU,
    status:product.status,
    regularPrice:product.regularPrice,
    salePrice:product.salePrice
    })

    let finalProduct = await result.save()

    if(finalProduct){
        res.json({
            status:true,
            "name":"fhgf"
        })
    }
    else{
        res.json({
            status:false
        })
    }

})