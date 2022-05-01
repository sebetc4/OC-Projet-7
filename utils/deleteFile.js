const fs = require('fs')

exports.deleteLastUserImage = (req, user) => {
    const { directory } = req.body
    const filename = directory === 'avatar' ? user.avatarUrl.split(`/images/avatar/`)[1] : user.coverUrl.split(`/images/cover/`)[1]
    if (filename !== 'avatar-profile.webp' && filename !== 'cover-profile.webp') {
        fs.unlinkSync(`images/${directory}/${filename}`, (err) => {
        if (err)
                throw err;
        })
    }
}

exports.deleteLastPostImage = (post) => {
    fs.unlinkSync(`images/post/${post.imageUrl.split(`/images/post/`)[1]}`, (err) => {
        if (err)
            throw err
    })
}