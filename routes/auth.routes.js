const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

// Route de connexion
router.post("/login", authCtrl.login);


module.exports = router;
