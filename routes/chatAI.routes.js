const express = require('express');
const router = express.Router();
const chatAICtrl = require("../controllers/chatAI.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", auth, chatAICtrl.sendMessage)

module.exports = router;
