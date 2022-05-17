
exports.addFollow = async (req, res, next) => {
    const user = req.user
    const targetUserId = req.params.id
    try {
        if (!targetUserId) throw { message: 'Missing parameters' }
        await user.addFollowing(targetUserId)
        return res.status(201).json('User followed')
    } catch (err) {
        next(err)
    }
}

exports.deleteFollow = async (req, res, next) => {
    const user = req.user
    const targetUserId = req.params.id
    try {
        if (!targetUserId) throw { message: 'Missing parameters' }
        user.removeFollowing(targetUserId)
        return res.status(200).json('User unfollowed')
    } catch (err) {
        next(err)
    }
}
