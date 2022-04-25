const express = require('express');
const router = express.Router();
const commentPostCtrl = require("../controllers/commentPost.controller");

router.post("/:id", commentPostCtrl.createComment)*
router.delete("/:id", commentPostCtrl.deleteComment)


module.exports = router;