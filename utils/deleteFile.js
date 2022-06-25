const fs = require('fs')
const { deleteFile } = require('../config/s3.config')

exports.deleteLastUserImage = (req, user) => {
    const { directory } = req.body
    const filename = directory === 'avatar' ? user.avatarUrl.split(`/images/avatar/`)[1] : user.coverUrl.split(`/images/cover/`)[1]
    if (filename !== 'avatar-profile.webp' && filename !== 'cover-profile.webp') {
        process.env.NODE_ENV === 'production' ?
            deleteFile(user.avatarUrl.split(`amazonaws.com/`)[1])
            :
            fs.unlinkSync(`images/${directory}/${filename}`, (err) => {
                if (err)
                    throw err;
            })
    }
}

exports.deleteLastPostImage = (post) => {
    if (process.env.NODE_ENV === 'production') {
        deleteFile(post.imageUrl.split(`amazonaws.com/`)[1])
    } else {
        fs.unlinkSync(`images/post/${post.imageUrl.split(`/images/post/`)[1]}`, (err) => {
            if (err)
                throw err
        })
    }
}