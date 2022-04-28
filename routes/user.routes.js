const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const multer = require('../middleware/multer.middleware')

router.post("/register",auth, userCtrl.createUser)
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/", auth, multer, userCtrl.updateUser);
router.put("/password", auth, userCtrl.updatePassword);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
