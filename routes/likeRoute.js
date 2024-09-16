const express = require("express");
const {giveLike} = require("../controllers/likeControllers");

const router = express.Router();


router.post("/:blogId",giveLike)

module.exports = router;