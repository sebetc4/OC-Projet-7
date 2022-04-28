const models = require('../models');

exports.createComment = async (req, res, next) => {
    const { text } = req.body
    const { userId } = req.auth
    const postId = req.params.id
    if (!userId)
        return res.status(400).send('Missing parameters');
    try {
        const post = await models.Post.findOne({
            where: { id: postId }
        })
        if (!post)
            return res.status(404).send(`Post id unknown ${req.params.id}`)
        const user = await models.User.findOne({
            where: { id: userId }
        })
        if (!user)
            return res.status(404).send(`User id unknown ${userId}`)
        const comment = await models.CommentPost.create({
            text,
            userId,
            postId
        })
        return res.status(201).json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteComment = async (req, res, next) => {
    const { userId, isAdmin } = req.auth
    try {
        const comment = await models.CommentPost.findOne({
            where: { id: req.params.id }
        })
        if (userId !== comment.userId && !isAdmin)
            return res.status(405).send('Not allowed!')
        await comment.destroy()
        res.status(200).json("Comment deletion is done")
    } catch (err) {
        return res.status(500).send('Unable to delete comment')
    }
}
