const express = require('express');
const router = express.Router();
const followCtrl = require("../controllers/follow.controller");
const auth = require("../middleware/auth.middleware");

router.post("/:id", auth, followCtrl.addFollow)
router.delete('/:id', auth, followCtrl.deleteFollow)

module.exports = router;

