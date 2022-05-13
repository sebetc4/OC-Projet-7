const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require('../middleware/multer.middleware')
const auth = require("../middleware/auth.middleware");


router.get("/", auth, postCtrl.getAllPosts)
router.post("/", auth, multer, postCtrl.createPost)
router.post("/like/:id", auth, postCtrl.likePost)
router.put("/:id", auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, postCtrl.deletePost)

module.exports = router;

