const express = require("express");

const {giveDislike} = require("../controllers/disLikeControllers");

const router = express.Router();


router.post("/:blogId",giveDislike)

module.exports = router;