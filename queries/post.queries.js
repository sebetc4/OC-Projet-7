const { Post, User, CommentPost } = require('../models');
const attributes = require('../utils/attributes')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createPost = async (UserId, text, imageUrl, videoUrl) => {
    const newPost = await Post.create({
        UserId,
        text,
        imageUrl,
        videoUrl
    })
    if (newPost)
        return newPost
    else
        throw { message: `Internal Server Error` }
}

exports.findOnePostWhereIdAllAttributes = async (id) => {
    const post = await Post.findOne({
        where: { id },
    })
    if (post)
        return post
    else
        throw { message: `Post id unknown` }
}

exports.findAllPostsUserAndCommentRestrictedAttributes = async () => {
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

exports.findAllPostsWhereQueryAllAttributes = async (query) => {
    const posts = await Post.findAll({
        where: {
            text: {
                [Op.like]: `%${query}%`
            }
        }
    })
    if (posts)
        return posts
    else
        return null
};

