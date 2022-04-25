// Imports
const models = require('../models');
const attributes = require('../utils/attributes')
const bcrypt = require("bcrypt");
const fs = require('fs')
const paths = require('../utils/paths')



// Creation controller
exports.createUser = async (req, res, next) => {
    const { email, lastName, firstName, password } = req.body;
    if (email === null || lastName === null || firstName === null || password == null)
        return res.status(400).send('Missing parameters');
    try {
        const newUser = await models.User.create({
            email,
            firstName,
            lastName,
            password,
            avatarUrl: `${paths.getImagesPath(req)}/avatar/avatar-profile.webp`,
            coverUrl: `${paths.getImagesPath(req)}/cover/cover-profile.webp`
        })
        return res.status(201).json({ userId: newUser.id })
    } catch (err) {
        return res.status(500).json({ path: err.errors[0].path, error: err.errors[0].message })
    }
}

// Get controller
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await models.User.findAll({
            attributes: attributes.user
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
            attributes: attributes.user,
            include: {
                model: models.Post
            }
        })
        if (!user) {
            return res.status(404).send(`User id unknown ${req.params.id}`)
        }
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).send('Unable to get user')
    }
}

// Modify controller
const getImageUrl = (req) => {
    if (req.body.directory === 'avatar')
        return { avatarUrl: `${paths.getImagesPath(req)}/avatar/${req.files.avatar[0].filename}` }
    else if (req.body.directory === 'cover')
        return { coverUrl: `${paths.getImagesPath(req)}/cover/${req.files.cover[0].filename}` }
}

const getUserObject = (req) => {
    return req.files ? (
        getImageUrl(req)
    ) :
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            bio: req.body.bio
        }
}

const deleteLastFile = (req, user) => {
    const directory = req.body.directory
    const filename = directory === 'avatar' ? user.avatarUrl.split(`/images/avatar/`)[1] : user.coverUrl.split(`/images/cover/`)[1]
    if (filename !== 'avatar-profile.webp' && filename !== 'cover-profile.webp') {
        fs.unlink(`images/${directory}/${filename}`, (err) => {
            if (err)
                throw err;
        })
    }
}

exports.updateUser = async (req, res, next) => {
    const { userId } = req.body
    if (userId === null) 
        return res.status(400).send('Missing parameters');
    try {
        const user = await models.User.findOne({
            where: { id: userId },
            attributes: attributes.user
        })
        if (!user) {
            return res.status(404).send(`User id unknown ${userId}`)
        }
        const userObject = getUserObject(req)
        req.files && deleteLastFile(req, user)
        await user.update(userObject);
        res.status(200).json({ ...userObject })
    } catch (err) {
        return res.status(500).send('Unable to update user')
    }
}

exports.updatePassword = async (req, res, next) => {
    const { userId, password, newPassword } = req.body;
    if (userId === null || password === null || newPassword === null)
        return res.status(400).send('Missing parameters');
    try {
        const user = await models.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            return res.status(404).send(`User id unknown ${userId}`)
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(403).json({ error: "Invalid password" });
        }
        await user.update({ password: newPassword })
        res.status(200).json("User update is done")
    } catch (err) {
        return res.status(500).send('Unable to update password')
    }
}


// Delete controller
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        })
        if (!user) {
            return res.status(404).send(`User id unknown ${req.params.id}`)
        }
        await user.destroy()
        res.status(200).json("User deletion is done")
    } catch (err) {
        return res.status(500).send('Unable to delete user')
    }
}
