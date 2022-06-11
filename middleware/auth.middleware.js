// Middleware d'authentification
module.exports = (req, res, next) => {
    if (req.user)
        next()
    else {
        res.clearCookie('jwt')
        next({ message: 'Invalid token' })
    }
};
