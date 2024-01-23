const express = require ("express")
const {default:mongoose} = require ('mongoose')
const app = express()
const authRoutes = require("./routes/auth.js")
app.use(express.json())
app.use('/auth',authRoutes)


app.listen(3000,()=>{
    console.log("Server is running");
    mongoose.connect("mongodb://localhost:27017",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("MongoDb Connected");
    }).catch((err)=>{
        console.log(err);
    })



})