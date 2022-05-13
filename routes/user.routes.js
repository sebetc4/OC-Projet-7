const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const multer = require('../middleware/multer.middleware')

router.post('/register', userCtrl.createUser)
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/', auth, multer, userCtrl.updateUser);
router.put('/password', auth, userCtrl.updatePassword);
router.delete('/', auth, userCtrl.deleteUser);

module.exports = router;
