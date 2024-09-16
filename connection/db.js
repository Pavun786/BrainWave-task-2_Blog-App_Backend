const mongoose = require("mongoose")


const dbConnect = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected")
    }catch(err){
        console.log(err)
    }
}

module.exports = dbConnect;