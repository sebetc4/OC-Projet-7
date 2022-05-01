const express = require('express');
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/", authCtrl.auth)

module.exports = router;
