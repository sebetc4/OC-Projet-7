const express = require('express');
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");


router.post("/:id", auth, commentCtrl.createComment)
router.put("/:id", auth, commentCtrl.updateComment)
router.delete("/:id", auth, commentCtrl.deleteComment)


module.exports = router;