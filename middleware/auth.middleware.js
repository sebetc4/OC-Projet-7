// Imports
require("dotenv").config();
const jswt = require("jsonwebtoken");


// Middleware d'authentification
module.exports = (req, res, next) => {
    try {
        const decodedToken = jswt.verify(req.signedCookies.jswt, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        console.log(userId)
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valide !";
        } else {
            req.auth = { userId };
            next();
        }
    } catch {
        res.locals.user = null
        res.cookie('jswt', '', { maxAge: 1 })
        return res.status(500).send('no acces')
    }
};
