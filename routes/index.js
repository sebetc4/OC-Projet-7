const express = require('express');
const path = require('path')
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes")
const commentRoutes = require("./comment.routes")
const searchRoutes = require("./search.routes")
const todoRoutes = require("./todo.routes")
const openAiRoutes = require("./openAi.routes")
const followRoutes = require("./follow.routes")
const conversationRoutes = require('./conversation.routes')
const messageRoutes = require('./message.routes')
const companyNewRoutes = require('./companyNew.routes')
const adminRoutes = require('./admin.routes')



// Static routes
router.use('/images', express.static(path.join(__dirname, '../images')));

// Back routes
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);
router.use("/api/comment", commentRoutes);
router.use("/api/todo", todoRoutes);
router.use("/api/search", searchRoutes);
router.use('/api/open-ai', openAiRoutes)
router.use('/api/follow', followRoutes)
router.use('/api/conversation', conversationRoutes)
router.use('/api/message', messageRoutes)
router.use('/api/company-new', companyNewRoutes)
router.use('/api/admin', adminRoutes)


// Front route
if (process.env.NODE_ENV === 'production') {
  router.use(express.static(path.join(__dirname, '../client/build')))
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

module.exports = router;
