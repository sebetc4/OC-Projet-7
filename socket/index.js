const { User } = require('../models');
const attributes = require('../utils/attributes')

module.exports = (io, socket) => {
    console.log('ustilisateur connecté')

    socket.on('addUser', async (userId) => {
        await addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, message, createdAt, User }) => {
        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                message,
                createdAt,
                User
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('utilisateur déconnecté')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
}

// User functions
let users = []

const addUser = async (userId, socketId) => {
    const data = await User.findOne({
        where: { id : userId },
        attributes: attributes.userOnline,
    })
    if (!(users.some(user => user.userId === userId)))
        users.push({ userId, socketId, data })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}