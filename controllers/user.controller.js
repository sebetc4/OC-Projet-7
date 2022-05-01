const { getModifyUserImagePath } = require('../utils/pathFile')
const { createUser, findOneUserAndPostWhereIdRestrictedAttributes } = require('../queries/user.queries')
const { deleteLastUserImage } = require('../utils/deleteFile');

exports.createUser = async (req, res, next) => {
    const { email, lastName, firstName, password } = req.body;
    try {
        if (!email || !lastName || !firstName || !password) throw { message: 'Missing parameters' }
        await createUser(req, email, firstName, lastName, password)
        return res.status(201).json('User creation is done')
    } catch (err) {
        next(err)
    }
}

exports.getOneUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        if (!userId) throw { message: 'Missing parameters' }
        const user = await findOneUserAndPostWhereIdRestrictedAttributes(userId)
        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// Get user's object for updateUser
const getUserObject = (req, email, firstName, lastName, password, bio) => {
    return req.files ? (
        getModifyUserImagePath(req)
    ) :
        { email, firstName, lastName, password, bio }
}

exports.updateUser = async (req, res, next) => {
    const user = req.user
    const { email, firstName, lastName, password, bio } = req.body
    try {
        if (!req.files && !firstName && !lastName && !password && !bio) throw { message: 'Missing parameters' }
        const userObject = getUserObject(req, email, firstName, lastName, password, bio)
        req.files && deleteLastUserImage(req, user)
        await user.update(userObject);
        res.status(200).json({ ...userObject })
    } catch (err) {
        next(err)
    }
}

exports.updatePassword = async (req, res, next) => {
    const user = req.user
    const { password, newPassword } = req.body;
    try {
        if (!password || !newPassword) throw { message: 'Missing parameters' }
        user.checkPassword(password, user.password)
        await user.update({ password: newPassword })
        res.status(200).json("Password update is done")
    } catch (err) {
        next(err)
    }
}

exports.checkPassword = async (req, res, next) => {
    const user = req.user
    const { password } = req.body;
    try {
        if (!newPassword) throw { message: 'Missing parameters' }
        user.checkPassword(password, user.password)
        res.status(200).json("Password is true")
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    const user = req.user
    try {
        await user.destroy()
        res.status(200).json("User deletion is done")
    } catch (err) {
        next(err)
    }
}
