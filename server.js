const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const dbConnect = require("./connection/db")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const likeRoute = require("./routes/likeRoute") 
const dislikeRoute = require("./routes/dislikeRoute")
const commandRoute = require("./routes/commandRoute")

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
    origin : "https://brain-wave-task-2-blog-app-front-end.vercel.app"
}))

const port = 4600 || process.env.PORT;

dbConnect();

app.use("/user",userRoute)
app.use("/blog",blogRoute)
app.use("/like",likeRoute)
app.use("/dislike",dislikeRoute)
app.use("/command",commandRoute)

app.get("/",(req,res)=>{
    res.send({message : "Welocome to blog app"})
})

app.listen(port,()=>{
    console.log(`The server run on port ${port}`)
})

  