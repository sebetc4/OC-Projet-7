const express = require('express');
const adminCtrl = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.delete('/disable-user-account/:id', auth, adminCtrl.disableUserAccount);

module.exports = router;