// Imports
require("dotenv").config();
const bcrypt = require("bcrypt");
const jswt = require("jsonwebtoken");
const models = require('../models');

// Contrôleur d'inscription
exports.signup = async (req, res, next) => {
    const { email, username, password } = req.body;
    if (email == null || username == null || password == null) {
        return res.status(400).send('missing parameters');
    }
    try {
        const newUser = await models.User.create({ ...req.body, isAdmin: 0 })
        console.log(newUser)
        return res.status(201).json(`New user add in db with id ${newUser.id}`)
    } catch (err) {
        return res.status(400).json({ path: err.errors[0].path, error: err.errors[0].message })
    }
}


// Contrôleur de connexion
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (email == null || password == null) {
        return res.status(400).send('missing parameters');
    }
    try {
        const user = await models.User.findOne({
            where: { email }
        })
        if (!user) {
            return res.status(404).json({ error: "user not exist" });
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(403).json({ error: "invalid password" });
        }
        res.cookie(
            'jwt',
            jswt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.USER_TOKEN, { expiresIn: "24h" }),
            {
                httpOnly: true,
                signed: true
            })
        return res.status(200).json(`Utilisateur ${user.id} connecté`)
    } catch (err) {
        return res.status(500).send({ err })
    }
}
