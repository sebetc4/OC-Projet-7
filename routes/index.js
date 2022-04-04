const path = require('path')
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const express = require('express');
const router = express.Router();

router.use(express.static('client/build'));
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router;
