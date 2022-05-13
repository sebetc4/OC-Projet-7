const express = require('express');
const router = express.Router();
const todoCtrl = require("../controllers/todo.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, todoCtrl.createTodo)
router.put("/toggle-done/:id", auth, todoCtrl.toggleTodo)
router.delete('/:id', auth, todoCtrl.deleteTodo)

module.exports = router;

