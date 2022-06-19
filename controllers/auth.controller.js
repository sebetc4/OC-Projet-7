const { findOneUserWhereEmail } = require('../queries/user.queries')

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) throw { message: 'Missing parameters' }
    try {
        const user = await findOneUserWhereEmail(email)
        user.checkPassword(password)
        if (user.deletedAt)
            throw { message: `Account disabled` }
        req.login(user.id)
        return res.status(200).json('User logged in')
    } catch (err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {
    req.logout()
    return res.status(200).json(`User logged out`)
}

exports.auth = async (req, res, next) => {
    try {
        const user = { ...req.user.dataValues }
        delete user.password
        return res.status(200).json({ user })
    } catch (err) {
        req.logout()
        return res.status(200).json({ user: null })
    }
};

exports.checkPassword = async (req, res, next) => {
    const user = req.user
    const { password } = req.body;
    try {
        if (!password) throw { message: 'Missing parameters' }
        await user.checkPassword(password)
        res.status(200).json({ password: true })
    } catch (err) {
        next(err)
    }
}
