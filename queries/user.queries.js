const { User, Post, Todo } = require('../models');
const { getNewUserAvatarPath, getNewUserCoverPath } = require('../utils/pathFile')
const attributes = require('../utils/attributes')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.createUser = async (req, email, firstName, lastName, password) => {
    const newUser = User.create({
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

exports.findOneUserAndPostWhereIdRestrictedAttributes = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: attributes.user,
        include: [
            { model: Post },
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

exports.findOneUserAndTodoWhereIdAllAttributes = async (id) => {
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

exports.findOneUserWhereEmailAllAttributes = async (email) => {
    const user = await User.findOne({
        where: { email }
    })
    if (user)
        return user
    else
        throw { message: `Email unknown` }
}

exports.findAllUsersWhereQueryRestrictedAttributes = async (query) => {
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
