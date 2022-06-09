const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        //Ici on crée une variable token pour récupéré le header authorization ou est renseigner notre token
        const token = req.headers.authorization.split(' ')[1]; //<=== Ici on précise [1] pour bien ciblé le token et non le mot "Bearead"
        //Ont utilise jwt.verify(token, 'TOKEN') afin de vérifier notre token pour être sur qu'il correspond a notre token encodé
        const decodedToken = jwt.verify(token, 'TOKEN');
        //Ici ont récupére le UserId
        const userId = decodedToken.userId;
        //Ici on vérifie si le UserID de la requête correspond bien avec celui du token
        if(req.body.userId && req.body.userId !== userId){
            //Si cela ne correspond pas, on revois ça :
            throw 'User ID non valable';
        }else{
            //Si le UserID de la requête correspond bien avec celui du token ont peut passer la requête au prochain middleware
            next();
        }
    } catch (error) {
        res.status(401).json({message: 'Requête non authentifié !'});
    }
};