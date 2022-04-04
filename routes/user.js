const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.get("/", userCtrl.getAllUsers);

router.get("/:id", userCtrl.getOneUser);

router.put("/:id", userCtrl.updateUser);

router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
