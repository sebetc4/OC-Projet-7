// Imports
const models = require('../models');

// Contrôleur d'inscription
exports.createUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    if (email == null || username == null || password == null) {
        return res.status(400).send('Missing parameters');
    }
    try {
        const newUser = await models.User.create({ 
            email,
            username,
            password,
            isAdmin: 0 
        })
        return res.status(201).json(`New user add in db with id ${newUser.id}`)
    } catch (err) {
        return res.status(500).json({ path: err.errors[0].path, error: err.errors[0].message })
    }
}

const userAttributesGet = [ 'id', 'email', 'username', 'picture', 'bio' ]

// Controleur de récupération de tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await models.User.findAll({
            attributes: userAttributesGet
        })
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).send('Unable to get all users')
    }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id },
            attributes: userAttributesGet
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).send('Unable to get user')
    }
}

const getUserObject = (req) => {
    req.file ?
        {} :
        {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({ where: { id: req.params.id } })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        const userObject = getUserObject(req)
        await user.update(userObject);
        res.status(200).json("Modification effectuée")
    } catch (err) {
        return res.status(500).send( err )
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        await user.destroy()
        res.status(200).json("Supression effectuée")
    } catch (err) {
        return res.status(500).send({ err })
    }
}
