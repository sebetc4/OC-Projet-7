const express = require('express');
const router = express.Router();
const commentPostCtrl = require("../controllers/commentPost.controller");

router.post("/comment-post/:id", commentPostCtrl.createComment)

module.exports = router;