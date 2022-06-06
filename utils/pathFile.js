const { uploadFile } = require("../config/s3.config")

const getImagesPath = (req) => `${req.protocol}://${req.get("host")}/images`

// User's images path

exports.getNewUserAvatarPath = (req) => `${getImagesPath(req)}/avatar/avatar-profile.webp`
exports.getNewUserCoverPath = (req) => `${getImagesPath(req)}/cover/cover-profile.webp`

const getModifyUserAvatarPath = async (req) => {
    if (process.env.NODE_ENV === 'production') {
        const rep = await uploadFile(req.files.avatar[0])
        return rep.Location
    } else
        return `${getImagesPath(req)}/avatar/${req.files.avatar[0].filename}`
}
const getModifyUserCoverPath = async (req) => {
    if (process.env.NODE_ENV === 'production') {
        const rep = await uploadFile(req.files.cover[0])
        return rep.Location
    } else
        return `${getImagesPath(req)}/cover/${req.files.cover[0].filename}`
}

exports.getModifyUserImagePath = async (req) => {
    if (req.body.directory === 'avatar')
        return { avatarUrl: await getModifyUserAvatarPath(req) }
    else if (req.body.directory === 'cover')
        return { coverUrl: await getModifyUserCoverPath(req) }
}

exports.getInitialPath = (req) => {
    if (req.body.directory === 'avatar')
        return { avatarUrl: `${getImagesPath(req)}/avatar/avatar-profile.webp` }
    else if (req.body.directory === 'cover')
        return { coverUrl: `${getImagesPath(req)}/cover/cover-profile.webp` }
}

// Post's images path
exports.getPostImagePath = async (req) => {
    if (req.files.post) {
        if (process.env.NODE_ENV === 'production') {
            const rep = await uploadFile(req.files.post[0])
            return rep.Location
        } else
            return `${getImagesPath(req)}/post/${req.files.post[0].filename}`
    } else
        return null
}



