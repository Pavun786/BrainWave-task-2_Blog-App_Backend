
const likeModel = require("../models/likeModel")
const dislikeModel = require("../models/disLikeModel");
const blogModel = require("../models/blogModel");

const giveLike = async(req,res)=>{

    try{
        const {isLike,userId} = req.body;
        const {blogId} = req.params;
   
       const checkAsAlreadyLiked = await likeModel.findOne({blogId,givenBy : userId})

       if(!checkAsAlreadyLiked){
        
         const postLike = new likeModel({
            Like : isLike,
            givenBy : userId,
            blogId : blogId
         })
         await postLike.save();

         await blogModel.findByIdAndUpdate(blogId,{
            $push : {like : postLike._id}
         })

        
        let getData = await dislikeModel.find({}) 

        if(getData.length > 0){

        let filterData = getData.filter((ele)=> ele.blogId == blogId && ele.givenBy == userId)
 
        let getId = filterData[0]._id

        await blogModel.findByIdAndUpdate(blogId, {
            $pull: { disLike: getId},
          },{ new: true });
    
        }
         await dislikeModel.deleteOne({blogId,givenBy : userId}) 

         res.status(200).send({message : "you are Liked"})

        }
        else {

            await blogModel.findByIdAndUpdate(blogId,{
                $pull : { like : checkAsAlreadyLiked._id}
             },{ new: true })
       
            await likeModel.deleteOne({blogId,givenBy : userId}) 

            res.status(200).send({message : "like removed"})

       }

    }catch(err){
        res.status(500).send({message : err.message})
    }
}



module.exports = {giveLike};

