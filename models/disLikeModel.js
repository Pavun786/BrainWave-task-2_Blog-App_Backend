const mongoose = require("mongoose")

const disLikeSchema = new mongoose.Schema({

     blogId : {
        type : mongoose.ObjectId,
        ref : "blog"
     },
     disLike :{
         type : Boolean,
     },
     givenBy : {
        type : mongoose.ObjectId,
        ref : "User"
     }
})

module.exports = mongoose.model("DisLike",disLikeSchema)