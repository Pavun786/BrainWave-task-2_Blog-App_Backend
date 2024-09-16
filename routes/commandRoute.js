const express = require("express");
const { postCommand } = require("../controllers/commandControllers");

const router = express.Router();

router.post("/newCommand/:blogId",postCommand)

module.exports = router;