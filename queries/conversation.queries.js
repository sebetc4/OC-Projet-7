const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Conversation, User } = require('../models');
const attributes = require('../utils/attributes')

exports.getAllUserconversations = async (userId) => {
    const conversations = await Conversation.findAll({
        where: {
            [Op.or]: [
                {
                    firstUserId: userId
                },
                {
                    secondUserId: userId
                }
            ]
        },
        include: [
            {
                model: User,
                as: 'firstUser',
                attributes: attributes.userInConversation
            }, {
                model: User,
                as: 'secondUser',
                attributes: attributes.userInConversation
            }
        ]
    })
    return conversations
}

exports.getOneConversation = async (user1Id, user2Id) => {
    const conversation = await Conversation.findOne({
        where: {
            firstUserId: {
                [Op.or]: [user1Id, user2Id]
            },
            secondUserId: {
                [Op.or]: [user1Id, user2Id]
            }
        },
    })
    return conversation
}

exports.createConversation = async (firstUserId, secondUserId) => {
    const conversation = await Conversation.create({
        firstUserId,
        secondUserId
    })
    return conversation
}