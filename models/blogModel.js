const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

     blogDiscription : {
        type : String,
        required : true
     },
     blogUrl :{
        type : String,
        required : true
     },
     creationDate :{
        type : Date,
        default: Date.now
     },
     cloudinary_id: {
        type: String,
    },
    postedBy : {
        type : mongoose.ObjectId,
        ref : "User"
    },
    like : [{
         type : mongoose.ObjectId,
         ref : "Like",
         default: []
    }],
    disLike : [{
         type : mongoose.ObjectId,
         ref : "DisLike",
         default: []
    }],
    commands : [
        {
         type : mongoose.ObjectId,
         ref : "Command",
         default : []
        }
    ]
})

module.exports = mongoose.model("Blog",blogSchema)