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
const Cart = require ("./models/Cart")
const ListItem = require("./models/ListItem")


// bodyparser ---------------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))


// mongoose ----------------
const {mongoose } = require("mongoose")
mongoose.connect("mongodb+srv://suman:yn4MCsjdscc4UZGN@cluster0.ojmad2k.mongodb.net/freshcart").then(()=>{
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
        })
    }
    else{
        res.json({
            status:false
        })
    }

})

// ourproducts-------------------
app.get("/products",async(req,res)=>{
    let result= await Product.find({})

    if(result){
        res.json({
            status:true,
            ourproducts:result
        })
    }
    else{
        res.json({
            status:false
        })
    }

})




// add cart api 

app.post("/addcart", async (req, res)=>{
    let carts = req.body.item
    let result= await Cart.insertOne({
    title:carts.title,
    category:carts.category,
    weight:carts.weight,
    weightUnit:carts.weightUnit,
    image:carts.image,
    description:carts.description,
    code:carts.code,
    SKU:carts.SKU,
    status:carts.status,
    regularPrice:carts.regularPrice,
    salePrice:carts.salePrice
    })

    let finalcart = await result.save()

    if(finalcart){
        res.json({
            status:true,
            
        })
    }
    else{
        res.json({
            status:false
        })
    }

})
    



app.get("/allcartitem",async(req,res)=>{
        let result= await Cart.find({})
        if(result){
            res.json({
                status:true,
                cartitem:result
            })
        }

        else{
            res.json({
                status:false
            })
        }
})

app.get("/allitems",async(req,res)=>{
     let result=await Cart.find({})
     if(result){
        res.json({
            status:true,
            ouritem:result
        })
    }
    else{
        res.json({
            status:false
        })
    }
})


app.post("/WishList", async (req, res)=>{
    let WishListItem = req.body.item
    let result= await ListItem.insertOne({
    title:WishListItem.title,
    category:WishListItem.category,
    weight:WishListItem.weight,
    weightUnit:WishListItem.weightUnit,
    image:WishListItem.image,
    description:WishListItem.description,
    code:WishListItem.code,
    SKU:WishListItem.SKU,
    status:WishListItem.status,
    regularPrice:WishListItem.regularPrice,
    salePrice:WishListItem.salePrice
    })

    let finalcart = await result.save()

    if(finalcart){
        res.json({
            status:true,
            
        })
    }
    else{
        res.json({
            status:false
        })
    }

})

app.get("/allListItem",async(req,res)=>{
        let result= await ListItem.find({})
        if(result){
            res.json({
                status:true,
                listItem:result
            })
        }

        else{
            res.json({
                status:false
            })
        }
})

app.get("/allList",async(req,res)=>{
     let result=await ListItem.find({})
     if(result){
        res.json({
            status:true,
            ourList:result
        })
    }
    else{
        res.json({
            status:false
        })
    }
})


// removeitem-----------------
app.post("/removecartitem",async(req,res)=>{
    let result= await Cart.findOneAndDelete({"_id":req.body.item._id})

    if(result){
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

app.post("/removeListItem",async(req,res)=>{
    let result= await ListItem.findOneAndDelete({"_id":req.body.item._id})

    if(result){
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



app.post("/",(req,res)=>{
    res.json({
        status:true
    })
})