// Imports
require("dotenv").config();
const bcrypt = require("bcrypt");
const jswt = require("jsonwebtoken");
const attributes = require('../utils/attributesInRes')
const models = require('../models');

// Contrôleur de connexion
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === null || password === null) {
        return res.status(400).send('missing parameters');
    }
    try {
        const user = await models.User.findOne({
            where: { email }
        })
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(403).json({ error: "invalid password" });
        }
        res.cookie(
            'jswt',
            jswt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIME_LIFE }),
            {
                httpOnly: true,
                maxAge: process.env.TOKEN_TIME_LIFE,
                signed: true
            })
        return res.status(200).json('User logged in')
    } catch (err) {
        return res.status(500).send({ err })
    }
}

exports.logout = async (req, res, next) => {
    res.cookie('jswt', '', { maxAge: 1 })
    return res.status(200).json(`User logged out`)
}

exports.checkJswt = async (req, res, nex) => {
    try {
        const decodedToken = jswt.verify(req.signedCookies.jswt, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const user = await models.User.findOne({
            where: { id: userId },
            attributes: attributes.jswt
        })
        return res.status(200).json({user: user})
    } catch {
        res.cookie('jswt', '', { maxAge: 1 })
        return res.status(200).json({user: null})
    }
};
