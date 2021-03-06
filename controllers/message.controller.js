const { Message, Conversation, User } = require('../models');
const attributes = require('../utils/attributes')

exports.createMessage = async (req, res, next) => {
    const user = req.user
    const conversationId = req.params.id
    const { message } = req.body
    try {
        const conversation = await Conversation.findByPk(conversationId)
        const newMessage = await Message.create({
            message,
            conversationId: conversation.id,
            senderId: user.id
        })
        return res.status(201).json(newMessage)
    } catch (err) {
        next(err)
    }
}

exports.getAllMessages = async (req, res, next) => {
    const user = req.user
    const conversationId = req.params.id
    try {
        const conversation = await Conversation.findByPk(conversationId)
        const messages = await Message.findAll({
            where: { conversationId },
            order: [['createdAt', 'ASC']],
            include: [{
                model: User,
                attributes: attributes.userInPost
            }]
        })
        if (user.id === conversation.firstUserId)
            conversation.update({ unreadMessageFirstUser: 0 })
        else
            conversation.update({ unreadMessageSecondUser: 0 })
        return res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}