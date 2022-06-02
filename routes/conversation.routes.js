const express = require('express');
const router = express.Router();
const conversationCtrl = require("../controllers/conversation.controller");
const auth = require("../middleware/auth.middleware");

router.post("/:id", auth, conversationCtrl.createConversation)
router.get("/", auth, conversationCtrl.getAllConversations)


module.exports = router;