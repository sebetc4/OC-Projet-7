const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const searchCtrl = require("../controllers/search.controller");

router.get("/",auth, searchCtrl.search)

module.exports = router;