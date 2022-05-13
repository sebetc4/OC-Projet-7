const { findAllUsersWhereQueryRestrictedAttributes } = require('../queries/user.queries')
const { findAllPostsWhereQueryAllAttributes } = require('../queries/post.queries')


exports.search = async (req, res, next) => {
  const query = req.query.query
  const users = await findAllUsersWhereQueryRestrictedAttributes(query)
  const posts = await findAllPostsWhereQueryAllAttributes(query)
  return res.status(200).json({ users, posts })
}