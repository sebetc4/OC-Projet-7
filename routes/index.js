const express = require('express');
const path = require('path')
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes")
const commentPostRoutes = require("./commentPost.routes")
const searchRoutes = require("./search.routes")
const todoRoutes = require("./todo.routes")


// Static routes
router.use(express.static(path.join(__dirname,'../client/build')))
router.use('/images', express.static(path.join(__dirname, '../images')));

// Back routes
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);
router.use("/api/todo", todoRoutes);
router.use("/api/comment-post", commentPostRoutes);
router.use("/api/search", searchRoutes);

// Front route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
  
module.exports = router;
