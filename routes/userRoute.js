const express = require("express")
const {userRegister,loginUser} = require("../controllers/userControllers")
const router = express.Router();

router.post("/register",userRegister)
router.post("/login",loginUser)

module.exports = router;