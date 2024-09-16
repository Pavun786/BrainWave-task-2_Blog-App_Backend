const mongoose = require("mongoose")

const commandSchema = new mongoose.Schema({

    blogId : {
       type : mongoose.ObjectId,
       ref : "Blog",
       required: true
    },
    command : {
        type : String,
    },
    commandBy : {
        type : mongoose.ObjectId,
        ref : "User",
        required: true
    },
    replies : [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref : "Command",
         default : []
       }
    ]
})

module.exports = mongoose.model("Command",commandSchema)