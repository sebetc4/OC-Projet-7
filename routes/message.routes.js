const express = require('express');
const router = express.Router();
const messageCtrl = require("../controllers/message.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:id", auth, messageCtrl.getAllMessages)
router.post("/:id", auth, messageCtrl.createMessage)


module.exports = router;