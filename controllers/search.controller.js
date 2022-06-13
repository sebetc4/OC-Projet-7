const { findAllUsersAndFollowWhereQuery, findAllUsersChatSearchWhereQuery } = require('../queries/user.queries')
const { findAllPostsUserLikeAndCommentWhereQuery } = require('../queries/post.queries')


exports.search = async (req, res, next) => {
    const query = req.query.query
    try {
        if (!query)
            throw { message: 'Missing parameters' }
        query.replaceAll('+', ' ')
        const users = await findAllUsersAndFollowWhereQuery(query)
        const posts = await findAllPostsUserLikeAndCommentWhereQuery(query)
        return res.status(200).json({ users, posts })
    } catch (err) {
        next(err)
    }

}

exports.chatSearch = async (req, res, next) => {
    const query = req.query.query
    try {
        if (!query)
            throw { message: 'Missing parameters' }
        query.replaceAll('+', ' ')
        const users = await findAllUsersChatSearchWhereQuery(query)
        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}