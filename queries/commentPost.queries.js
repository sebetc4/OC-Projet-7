const { CommentPost } = require('../models');

exports.createComment = async (text, userId, postId) => {
    const newComment = await CommentPost.create({
        text,
        userId,
        postId
    })
    if (newComment)
        return newComment
    else
        throw { message: `Internal Server Error` }
}

exports.getOneCommentPostWhereIdAllAttributes = async (id) => {
    const comment = await CommentPost.findOne({
        where: { id }
    })
    if (comment)
        return comment
    else
        throw { message: `Comment id unknown` }
}


