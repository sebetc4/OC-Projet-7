const express = require('express');
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/", authCtrl.auth)
router.post('/check-password', auth, authCtrl.checkPassword)

module.exports = router;
