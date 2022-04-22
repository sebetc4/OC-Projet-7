const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require('../middleware/multer.middleware')


router.get("/", postCtrl.getAllPost)
router.post("/", multer, postCtrl.createPost)
router.post("/like/:id", postCtrl.likePost)
router.delete('/:id', postCtrl.deletePost)

module.exports = router;

