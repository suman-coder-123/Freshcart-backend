express=require("express")


app=express()


app.listen(5000,()=>{
    console.log("server start")
})

// cors ------------
const cors=require("cors")
app.use(cors())


// bodyparser ---------------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))


// signup---------------
app.post("/signup",(req,res)=>{
    console.log(req.body)
}) 

app.post("/signin", (req,res)=>{
    console.log(req.body)
})

app.post("/reset",(req,res)=>{
    console.log(req.body)
})