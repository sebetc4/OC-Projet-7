const express = require('express');
const router = express.Router();
const newCtrl = require("../controllers/new.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", auth, newCtrl.createNew)
router.get("/", auth, newCtrl.getAllNews)

module.exports = router;

