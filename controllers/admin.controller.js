const { findOneUserWhereId } = require('../queries/user.queries')

exports.disableUserAccount = async (req, res, next) => {
    const user = req.user
    const targetUserId = req.params.id
    if (!targetUserId)
        throw { message: 'Missing parameters' }
    try {
        user.checkIsAdmin()
        const targetUser = await findOneUserWhereId(targetUserId)
        await targetUser.destroy()
        res.status(200).json("Disable user account sucess")
    } catch (err) {
        next(err)
    }
}