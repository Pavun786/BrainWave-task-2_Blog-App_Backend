const disLikeModel = require("../models/disLikeModel")
const likeModel = require("../models/likeModel")
const blogModel = require("../models/blogModel")

const giveDislike = async (req,res)=>{
  
    try{
        const {isDisLike,userId} = req.body;
        const {blogId} = req.params;
   
       const checkAsAlreadyDisLiked = await disLikeModel.findOne({blogId,givenBy : userId})

       if(!checkAsAlreadyDisLiked){
        
         const postDisLike = new disLikeModel({
            Like : isDisLike,
            givenBy : userId,
            blogId : blogId
         })
         await postDisLike.save();

         await blogModel.findByIdAndUpdate(blogId, {
            $push: { disLike: postDisLike._id },
          });

        //   await blogModel.findByIdAndUpdate(blogId, {
        //     $pull: { like: { givenBy: userId } },
        //   },{ new: true });
       let getData = await likeModel.find({}) 

       if(getData.length > 0){

       let filterData = getData.filter((ele)=> ele.blogId == blogId && ele.givenBy == userId)

       let getId = filterData[0]._id


        await blogModel.findByIdAndUpdate(blogId, {
            $pull: { like: getId },
          },{ new: true });

        }   
    
        await likeModel.deleteOne({blogId,givenBy : userId}) 

        res.status(200).send({message : "you are DisLiked"})
         
       }else{
          
         await blogModel.findByIdAndUpdate(blogId, {
            $pull: { disLike: checkAsAlreadyDisLiked._id },
          },{ new: true });

          await disLikeModel.deleteOne({blogId,givenBy : userId}) 

          res.status(200).send({message : "Dislike removed"})

       }

       
    }catch(err){
        res.status(500).send({message : err.message})
    }

}


module.exports = {giveDislike};

