const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Conversation, User } = require('../models');
const attributes = require('../utils/attributes')


exports.createConversation = async (req, res, next) => {
   const user = req.user
   const otherUserId = req.params.id
   try {
      const otherUser = await User.findByPk(otherUserId)
      const conversation = await Conversation.create({
         firstUserId: user.id,
         secondUserId: otherUser.id
      })
      return res.status(201).json(conversation)
   } catch (err) {
      next(err)
   }
}

exports.getAllConversations = async (req, res, next) => {
   const user = req.user
   try {
      const conversations = await Conversation.findAll({
         where: {
            [Op.or]: [
               {
                  firstUserId: user.id
               },
               {
                  secondUserId: user.id
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
      return res.status(200).json(conversations)
   } catch (err) {
      next(err)
   }
}