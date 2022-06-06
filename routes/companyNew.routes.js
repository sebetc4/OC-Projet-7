const express = require('express');
const router = express.Router();
const companyNewCtrl = require("../controllers/companyNew.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", auth, companyNewCtrl.createCompanyNew)
router.get("/", auth, companyNewCtrl.getAllCompanyNews)
router.put("/:id", auth, companyNewCtrl.updateCompanyNew)
router.delete("/:id", auth, companyNewCtrl.deleteCompanyNew)


module.exports = router;

