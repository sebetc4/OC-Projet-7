const { Conversation } = require('../models');


let conversations = []

exports.addConversation = async (socketId, userId, convId) => {
    conversations = conversations.filter(conv => conv.socketId !== socketId)
    conversations.push({ socketId, userId, convId })
}

exports.removeConversation = (socketId) => {
    conversations = conversations.filter(conv => conv.socketId !== socketId)
}

exports.checkIfCurrentConversation = (userId, convId) => {
    return conversations.some(conv => conv.convId === convId && conv.userId === userId)
}

exports.addUnreadMessage = async (receiverId, convId) => {
    const conversation = await Conversation.findByPk(convId)
    const unreadMessage = conversation.firstUserId === receiverId ? 'unreadMessageFirstUser' : 'unreadMessageSecondUser'
    conversation.increment(unreadMessage)
}