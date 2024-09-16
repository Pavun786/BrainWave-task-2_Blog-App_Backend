const commandModel = require("../models/command")
const blogModel = require("../models/blogModel")

const postCommand = async(req,res)=>{

    try{

        const{command,commandBy,parentCommandId} = req.body;

        const {blogId} = req.params;

        const data = new commandModel({
            
            blogId : blogId,
            command : command,
            commandBy : commandBy
        })
    
        await data.save();

        if(parentCommandId){

            await commandModel.findByIdAndUpdate(parentCommandId,{
                $push : { replies : data._id}
            })

            res.status(200).send({message : "Reply added successfully"})
        }else{

            await blogModel.findByIdAndUpdate(blogId,{
                $push : { commands : data._id}
            })
        
            res.status(200).send({message : "command successfully"})

        }

      }catch(err){
        res.status(500).send({message: err.message})
      }
}




module.exports = {postCommand}