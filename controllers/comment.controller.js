const { createComment, getOneCommentWhereId } = require('../queries/comment.queries')


exports.createComment = async (req, res, next) => {
    const { text } = req.body
    const user = req.user
    const postId = req.params.id
    try {
        const comment = await createComment(text, user.id, postId)
        return res.status(201).json(comment)
    } catch (err) {
        next(err)
    }
}

exports.updateComment = async (req, res, next) => {
    const user = req.user
    const { text } = req.body
    const commentId = req.params.id
    try {
        if (!commentId || !text ) throw { message: 'Missing parameters' }
        const comment = await getOneCommentWhereId(commentId)
        user.checkAllow(comment.userId)
        await comment.update({text});
        return res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}

exports.deleteComment = async (req, res, next) => {
    const user = req.user
    const commentId = req.params.id
    try {
        const comment = await getOneCommentWhereId(commentId)
        user.checkAllow(comment.userId)
        await comment.destroy()
        res.status(200).json("Comment deletion is done")
    } catch (err) {
        next(err)
    }
}
