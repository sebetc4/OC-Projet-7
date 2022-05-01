require("dotenv").config();
const { findOneUserWhereIdAllAttributes } = require('../queries/user.queries')

const jwt = require("jsonwebtoken");

const createJwtToken = (userId) => {
    return jwtToken = jwt.sign({ userId },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_TIME_LIFE })
}

const extractJwtToken = async (req, res) => {
    if (req.signedCookies.jwt) {
        try {
            const decodedToken = jwt.verify(req.signedCookies.jwt, process.env.TOKEN_SECRET);
            const user = await findOneUserWhereIdAllAttributes(decodedToken.userId)
            return user
        } catch (err) {
            res.clearCookie('jwt')
            return null
        }
    }
    return null
}

module.exports = async (req, res, next) => {
    const user = await extractJwtToken(req, res)
    req.user = user
    req.logout = () => res.clearCookie('jwt')
    req.login = (userId) => res.cookie('jwt', createJwtToken(userId), { httpOnly: true, maxAge: process.env.TOKEN_TIME_LIFE, signed: true })
    next();
}