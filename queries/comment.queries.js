const { Comment } = require('../models');

exports.createComment = async (text, userId, postId) => {
    const newComment = await Comment.create({
        text,
        userId,
        postId
    })
    if (newComment)
        return newComment
    else
        throw { message: `Internal Server Error` }
}

exports.getOneCommentWhereId = async (id) => {
    const comment = await Comment.findOne({
        where: { id }
    })
    if (comment)
        return comment
    else
        throw { message: `Comment id unknown` }
}


