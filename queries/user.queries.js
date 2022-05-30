const { User, Post, Todo, Comment } = require('../models');
const { getNewUserAvatarPath, getNewUserCoverPath } = require('../utils/pathFile')
const attributes = require('../utils/attributes')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.createUser = async (req, email, firstName, lastName, password) => {
    const newUser = await User.create({
        email,
        firstName,
        lastName,
        password,
        avatarUrl: getNewUserAvatarPath(req),
        coverUrl: getNewUserCoverPath(req)
    })
    if (newUser)
        return newUser
    else
        throw { message: `Internal Server Error` }
}

exports.findOneUserPostAndFollowWhereId = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: attributes.user,
        order: [
            [Post, 'updatedAt', 'DESC'],
            [Post, Comment, 'createdAt', 'DESC']
        ],
        include: [
            {
                model: Post,
                include: [{
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
            },
            {
                model: User,
                as: 'followers',
                attributes: attributes.userFollowed,
                through: {
                    attributes: [],
                }
            },
            {
                model: User,
                as: 'following',
                attributes: attributes.userFollowed,
                through: {
                    attributes: [],
                }
            }]
    })
    if (user)
        return user
    else
        throw { message: `User id unknown` }
}

exports.findOneUserTodoAndFollowWhereId = async (id) => {
    const user = await User.findOne({
        where: { id },
        include: [
            { model: Todo },
            {
                model: User,
                as: 'following',
                attributes: attributes.userFollowed,
                through: {
                    attributes: [],
                }
            }]
    })
    if (user)
        return user
    else
        throw { message: `User id unknown` }
}

exports.findOneUserWhereEmail = async (email) => {
    const user = await User.findOne({
        where: { email }
    })
    if (user)
        return user
    else
        throw { message: `Email unknown` }
}

exports.findAllUsersAndFollowWhereQuery = async (query) => {
    const users = await User.findAll({
        where: {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    lastName: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        },
        attributes: attributes.userInSearch,
        include: [
            {
                model: User,
                as: 'followers',
                attributes: attributes.userFollowed,
                through: {
                    attributes: [],
                }
            },
            {
                model: User,
                as: 'following',
                attributes: attributes.userFollowed,
                through: {
                    attributes: [],
                }
            }]
    })
    if (users)
        return users
    else
        return null
};

exports.findAllUsersChatSearchWhereQuery = async (query) => {
    const users = await User.findAll({
        where: {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    lastName: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        },
        attributes: attributes.userInSearch,
    })
    return users
};
