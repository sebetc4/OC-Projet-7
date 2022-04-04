// Imports
const models = require('../models');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await models.User.findAll({
            attributes: [
                'id', 'email', 'username', 'picture', 'bio'
            ]
        })
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).send({ err })
    }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id },
            attributes: [
                'id', 'email', 'username', 'picture', 'bio'
            ]
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        return res.status(200).json({ user })

    } catch (err) {
        return res.status(500).send({ err })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        })
        if (!user) {
            return res.status(400).send(`ID unknown ${req.params.id}`)
        }
        const userObject = req.file ?
        {} :
        {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
        await user.update(userObject);
        res.status(200).json("Modification effectuée")

    } catch (err) {
        return res.status(500).send({ err })
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
