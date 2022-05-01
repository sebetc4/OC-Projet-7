const express = require('express');
const router = express.Router();
const commentPostCtrl = require("../controllers/commentPost.controller");
const auth = require("../middleware/auth.middleware");


router.post("/:id", auth, commentPostCtrl.createComment)
router.put("/:id", auth, commentPostCtrl.updateComment)
router.delete("/:id", auth, commentPostCtrl.deleteComment)


module.exports = router;