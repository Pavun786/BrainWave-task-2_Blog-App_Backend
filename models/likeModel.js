const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({

     blogId : {
        type : mongoose.ObjectId,
        ref : "blog"
     },
     Like :{
         type : Boolean,
     },
     givenBy : {
        type : mongoose.ObjectId,
        ref : "User"
     }
})

module.exports = mongoose.model("Like",likeSchema)