const { User } = require('../models');
const attributes = require('../utils/attributes')

let users = []

exports.addUser = async (userId, socketId) => {
    const data = await User.findOne({
        where: { id: userId },
        attributes: attributes.userOnline,
    })
    if (!(users.some(user => user.userId === userId)))
        users.push({ userId, socketId, data })
    return users
}

exports.removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
    return users
}

exports.getUser = (userId) => {
    return users.find(user => user.userId === userId)
}