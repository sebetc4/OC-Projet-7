const { Post, User, CommentPost } = require('../models');
const attributes = require('../utils/attributes')

exports.createPost = async (UserId, text, imageUrl) => {
    const newPost = await Post.create({
        UserId,
        text,
        imageUrl,
    })
    if (newPost)
        return newPost
    else
        throw { message: `Internal Server Error` }
}

exports.getOnePostWhereIdAllAttributes = async (id) => {
    const post = await Post.findOne({
        where: { id },
    })
    if (post)
        return post
    else
        throw { message: `Post id unknown` }
}

exports.getAllPostsUserAndCommentRestrictedAttributes = async () => {
    const posts = await Post.findAll({
        include: [{
            model: User,
            attributes: attributes.userInPost
        }, {
            model: User,
            as: 'usersLiked',
            attributes: ['id'],
            through: {
                attributes: [],
            }
        }, {
            model: CommentPost,
            include: {
                model: User,
                attributes: attributes.userInPost
            }
        }]
    })
    return posts
}


