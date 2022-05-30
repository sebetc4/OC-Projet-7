const express = require('express');
const router = express.Router();
const openAiCtrl = require("../controllers/openAi.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", auth, openAiCtrl.sendMessage)

module.exports = router;
