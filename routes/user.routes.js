const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

// Route d'inscription
router.post("/register", userCtrl.createUser)

router.get("/", userCtrl.getAllUsers);

router.get("/:id", userCtrl.getOneUser);

router.put("/:id", userCtrl.updateUser);

router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
