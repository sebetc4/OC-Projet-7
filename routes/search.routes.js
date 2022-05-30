const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const searchCtrl = require("../controllers/search.controller");

router.get("/", auth, searchCtrl.search)
router.get("/chat-search", auth, searchCtrl.chatSearch)

module.exports = router;