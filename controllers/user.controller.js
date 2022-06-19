const { getModifyUserImagePath, getInitialPath } = require('../utils/pathFile')
const { createUser, findOneUserPostAndFollowWhereId } = require('../queries/user.queries')
const { deleteLastUserImage } = require('../utils/deleteFile');

exports.createUser = async (req, res, next) => {
    const { email, lastName, firstName, password } = req.body;
    try {
        if (!email || !lastName || !firstName || !password) throw { message: 'Missing parameters' }
        await createUser(req, email, firstName, lastName, password)
        return res.status(201).json('User creation success')
    } catch (err) {
        next(err)
    }
}

exports.getOneUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        if (!userId) throw { message: 'Missing parameters' }
        const user = await findOneUserPostAndFollowWhereId(userId)
        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// Get user's object for updateUser
const getUserObject = async (req, email, firstName, lastName, bio) => {
    return req.files ? (
        await getModifyUserImagePath(req)
    ) :
        { email, firstName, lastName, bio }
}

exports.updateUser = async (req, res, next) => {
    const user = req.user
    const { email, firstName, lastName, bio } = req.body
    try {
        if (!req.files && !email && !firstName && !lastName && bio == null) 
            throw { message: 'Missing parameters' }
        const userObject = await getUserObject(req, email, firstName, lastName, bio)
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
        const newHashPassword = await user.hashNewPassword(newPassword)
        await user.update({ password: newHashPassword })
        res.status(200).json("Password update success")
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    const user = req.user
    try {
        await user.destroy()
        res.status(200).json("User deletion sucess")
    } catch (err) {
        next(err)
    }
}

exports.resetImage = async (req, res, next) => {
    const user = req.user
    try {
        deleteLastUserImage(req, user)
        const imageUrl = getInitialPath(req)
        await user.update(imageUrl)
        res.status(200).json(imageUrl)
    } catch (err) {
        next(err)
    }
}

exports.toggleDarkMode = async (req, res, next) => {
    const user = req.user
    try {
        await user.update({darkMode: !user.darkMode})
        res.status(200).json('Toggle dark mode success')
    } catch (err) {
        next(err)
    }
}


exports.deleteUser = async (req, res, next) => {
    const user = req.user
    try {
        await user.destroy()
        res.status(200).json("User deletion success")
    } catch (err) {
        next(err)
    }
}
