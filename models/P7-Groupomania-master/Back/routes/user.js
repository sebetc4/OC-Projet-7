//Ici ont importe le framework express pour crée le routeur
const express = require('express');

//Ici ont crée le routeur grace a la function Router d'express
const router = express.Router();

//Ici ont récupére le controllers pour associer les function au différentes routes
const userCtrl = require('../controllers/user')

//******** Ici nous créons nos différentes routes *********/

router.post('/signup', userCtrl.signup)


//Ici ont export le Router
module.exports = router;