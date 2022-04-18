// Imports
require('dotenv').config();
const jswt = require('jsonwebtoken');

// Middleware d'authentification
module.exports = (req, res, next) => {
    try {
        const { userId, isAdmin } = jswt.verify(req.signedCookies.jswt, process.env.TOKEN_SECRET);
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ot allowed!';
        } else {
            req.auth = { userId, isAdmin };
            next();
        }
    } catch {
        res.cookie('jswt', '', { maxAge: 1 })
        return res.status(405).send('Not allowed!')
    }
};
