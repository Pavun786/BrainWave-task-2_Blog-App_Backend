const express = require("express")
const dotenv = require("dotenv")

dotenv.config();

const router = express.Router();

const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")
const {createBlog,getAllBlogs, getSingleBlog, updateBlog, deleteBlog} = require("../controllers/blogControllers")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})

//CloudinaryStorage is a storage engine,used to store the file without in locally, 

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "BLOG",
        allowedFormats: ['png', 'jpg', 'jpeg'],  // Allowed file formats
        transformation: [{ width: 250, height: 250, crop: 'fill' }] 
    }
})

const upload = multer({storage : storage})

router.post("/addBlog",upload.single("file"),createBlog)

router.get("/allBlogs",getAllBlogs)

router.get("/:id",getSingleBlog)

router.put("/:id",upload.single('file'),updateBlog)

router.delete("/:id",deleteBlog)

module.exports = router;