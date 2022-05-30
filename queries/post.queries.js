const { Post, User, Comment } = require('../models');
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
        return newPost
}

exports.findOnePostWhereId = async (id) => {
    const post = await Post.findByPk(id)
    if (post)
        return post
    else
        throw { message: `Post id unknown` }
}

exports.findAllPostsUserLikeAndComment = async (offset, limit) => {
    const posts = await Post.findAll({
        offset: (!isNaN(offset)) ? offset : null,
        limit: (!isNaN(limit)) ? limit : null,
        order: [
            ['updatedAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ],
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
            model: Comment,
            include: {
                model: User,
                attributes: attributes.userInPost
            }
        }]
    })
    return posts
}

exports.findAllPostsUserLikeAndCommentWhereQuery = async (query) => {
    const posts = await Post.findAll({
        where: {
            text: {
                [Op.like]: `%${query}%`
            }
        },
        order: [
            ['updatedAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ],
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
            model: Comment,
            include: {
                model: User,
                attributes: attributes.userInPost
            }
        }]
    })
    if (posts)
        return posts
    else
        return null
};

