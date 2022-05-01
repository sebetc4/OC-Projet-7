const getImagesPath = (req) => `${req.protocol}://${req.get("host")}/images`

// User's images path
const getModifyUserAvatarPath = (req) => `${getImagesPath(req)}/avatar/${req.files.avatar[0].filename}`
const getModifyUserCoverPath = (req) => `${getImagesPath(req)}/cover/${req.files.cover[0].filename}`
exports.getNewUserAvatarPath = (req) => `${getImagesPath(req)}/avatar/avatar-profile.webp`
exports.getNewUserCoverPath = (req) => `${getImagesPath(req)}/cover/cover-profile.webp`
exports.getModifyUserImagePath = (req) => {
    if (req.body.directory === 'avatar')
        return { avatarUrl: getModifyUserAvatarPath(req) }
    else if (req.body.directory === 'cover')
        return { coverUrl: getModifyUserCoverPath(req) }
}

exports.getNewPostImagePath = (req) => Object.keys(req.files).length !== 0 ? `${getImagesPath(req)}/post/${req.files.post[0].filename}` : null

exports.getModifyPostImagePath = (req) => req.files.post ? `${getImagesPath(req)}/post/${req.files.post[0].filename}` : null
