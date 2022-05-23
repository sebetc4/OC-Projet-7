const express = require('express');
const router = express.Router();
const newCtrl = require("../controllers/new.controller");
const auth = require("../middleware/auth.middleware");


router.get("/", auth, newCtrl.getAllNews)
router.post("/", auth, newCtrl.createNew)
router.put("/like/:id", auth, newCtrl.updateNew)
router.delete('/:id', auth, newCtrl.deleteNew)

module.exports = router;

