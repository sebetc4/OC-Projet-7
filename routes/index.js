const path = require('path')
const express = require('express');
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes")
const commentPostRoutes = require("./commentPost.routes")
const searchRoutes = require("./search.routes")

router.use(express.static('client/build'));
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);
router.use("/api/comment-post", commentPostRoutes);
router.use("/api/search", searchRoutes);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router;
