const blogModel = require("../models/blogModel")
const cloudinary = require("cloudinary").v2;


const createBlog = async(req,res)=>{
     console.log("executed")
   try{
       if(req.file){
        const{ blogDiscription,postedBy} = req.body;
   
        const blogData = {
        blogDiscription : blogDiscription,
        blogUrl : req.file.path,
        // creationDate : new Date().toLocaleString(),
        cloudinary_id : req.file.filename,
        postedBy : postedBy
       
    }

    const createBlog = new blogModel(blogData);

    await createBlog.save();

    res.status(200).send({message : "blog created successfully"})
    }else{
        res.status(404).send({ status: "error", message: `File not found!` });
    }
   }catch(err){
    res.status(500).send({message : err})
   }

}



const populateReplies = (depth) => {
    if (depth === 0) return undefined; // Stop recursion when depth is 0
  
    return {
      path: "replies",
      populate: [
        { path: "commandBy", select: "userName email" }, // Populate commandBy for replies
        populateReplies(depth - 1), // Recursively populate nested replies
      ].filter(Boolean),
    };
  };



const getAllBlogs = async(req,res)=>{
    try{
        const blogs = await blogModel.find().populate([
            { path: "postedBy", select: "userName email" },
            { path: "like", populate: { path: "givenBy", select: "userName email" } },
            { path: "disLike", populate: { path: "givenBy", select: "userName email" } },
            {
              path: "commands",
              populate: [
                { path: "commandBy", select: "userName email" }, 
                // {
                //   path: "replies", 
                //   populate: { path: "commandBy", select: "userName email" }, 
                //  },
                populateReplies(5)
              ],
            },
          ]);
        if(blogs.length == 0){
           res.status(404).send({message : "No blogs found" })
        }else{
           res.status(200).send(blogs)
        }
    }catch(err){
        console.log(err)
        res.status(500).send({message : err.message})
    }
}

const getSingleBlog = async(req,res)=>{
     
   try{
    const {id} = req.params;

    const data = await blogModel.findOne({_id : id})

    if(data){
        res.status(200).send(data)
        
    }else{
        res.status(404).send({message : "No blogs found"})
    }
   }catch(err){
        res.status(500).send({message : err.message})
   }
}

const updateBlog = async(req,res)=>{

    try{

        const {id} = req.params;
        const {blogDiscription} = req.body;
        let updateData ={}

       
        
        const checkData = await blogModel.findById({_id : id})
        
        if(!checkData){
           res.status(404).send({message : "Blog not found"})
        }else{
          
           if(req.file){
               
               await cloudinary.uploader.destroy(checkData.cloudinary_id)
   
               updateData.blogUrl = req.file.path,
               updateData.blogDiscription = blogDiscription
           }

           console.log(updateData)
   
           const blogUpdate = await blogModel.findByIdAndUpdate(id,updateData,{ new: true })

           console.log(blogUpdate)

           res.status(200).send({message : "The Blog updated successfully"})
        }

    }catch(err){
        res.status(500).send({message : err.message})
    }
     
}


const deleteBlog = async(req,res)=>{
    
    try{

        const {id} = req.params;

        const checkBlog = await blogModel.findByIdAndDelete(id)

        if(checkBlog){

            res.status(200).send({message : "Blog deleted successfully"})
            
        }else{
            res.status(404).send({message : "Blog not found"})
        }

    }catch(err){
        res.status(500).send({message : err.message})
    }
}

module.exports = {createBlog,getAllBlogs,getSingleBlog,updateBlog,deleteBlog}