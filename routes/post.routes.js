const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require('../config/multer.config')


router.get("/", postCtrl.getAllPost)
router.post("/", multer, postCtrl.createPost)

module.exports = router;

