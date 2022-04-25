const express = require('express');
const router = express.Router();
const searchCtrl = require("../controllers/search.controller");

router.get("/", searchCtrl.search)

module.exports = router;