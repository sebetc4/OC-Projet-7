const { addUser, getUser, removeUser } = require('./user.socket')
const { addConversation, addUnreadMessage, checkIfCurrentConversation, removeConversation } = require('./conversation.socket')

module.exports = (io, socket) => {
    socket.on('addUser', async (userId) => {
        const users = await addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, message, convId, createdAt, User }) => {
        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                message,
                createdAt,
                convId,
                User
            })
        }
        if (!checkIfCurrentConversation(receiverId, convId))
            addUnreadMessage(receiverId, convId)
    })

    socket.on('addConversation', ({ userId, convId }) => {
        addConversation(socket.id, userId, convId)
    })

    socket.on('newConversation', ({ otherUserId, conversation }) => {
        const user = getUser(otherUserId)
        if (user) {
            io.to(user.socketId).emit('getConversation', {
                conversation
            })
        }
    })

    socket.on('disconnect', () => {
        const users = removeUser(socket.id)
        removeConversation(socket.id)
        io.emit('getUsers', users)
    })
}

