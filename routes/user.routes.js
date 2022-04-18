const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const multer = require('../config/multer.config')

router.post("/register", userCtrl.createUser)
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/", auth, multer, userCtrl.updateUser);
router.put("/password", auth, userCtrl.updatePassword);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
