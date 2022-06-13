const { createConversation, getAllUserconversations, getOneConversation } = require('../queries/conversation.queries')
const { findOneUserWhereId } = require('../queries/user.queries')

exports.createConversation = async (req, res, next) => {
   const user = req.user
   const otherUserId = req.params.id
   try {
      if (!otherUserId)
         throw { message: 'Missing parameters' }
      const otherUser = await findOneUserWhereId(otherUserId)
      const conversationAlreadyexist = await getOneConversation(user.id, otherUser.id)
      if (conversationAlreadyexist)
         throw { message: `Conersation already exist` }
      const conversation = await createConversation(user.id, otherUser.id)
      return res.status(201).json(conversation)
   } catch (err) {
      next(err)
   }
}

exports.getAllConversations = async (req, res, next) => {
   const user = req.user
   try {
      const conversations = await getAllUserconversations(user.id)
      return res.status(200).json(conversations)
   } catch (err) {
      next(err)
   }
}