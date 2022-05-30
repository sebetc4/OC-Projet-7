const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Conversation, User } = require('../models');
const attributes = require('../utils/attributes')


exports.createConversation = async (req, res, next) => {
   const user = req.user
   const { targetUserId } = req.body
   try {
      const userTarget = await User.findByPk(targetUserId)
      const conversation = await Conversation.create({
         firstUserId: user.id,
         secondUserId: userTarget.id
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
               attributes: attributes.userInPost
            }, {
               model: User,
               as: 'secondUser',
               attributes: attributes.userInPost
            }
         ]
      })
      return res.status(200).json(conversations)
   } catch (err) {
      next(err)
   }
}