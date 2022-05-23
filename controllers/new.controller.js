
exports.createNew = async (req, res, next) => {
    const user = req.user
    const { text, title } = req.body
    try {
        user.checkIsAdmin(post.UserId)
        if (!text && !title) throw { message: 'Missing parameters' }

        return res.status(201).json(newPost)
    } catch (err) {
        next(err)
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await findAllPostsUserAndCommentRestrictedAttributes()
        return res.status(200).json(posts)
    } catch (err) {
        next(err)
    }
}


exports.updateNew = async (req, res, next) => {
    const user = req.user
    const { text, title } = req.body
    const newId = req.params.id
    try {
        user.checkIsAdmin(post.UserId)
        return res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

exports.deleteNew = async (req, res, next) => {
    const user = req.user
    const newId = req.params.id
    try {
        if (!newId) throw { message: 'Missing parameters' }
        const cNew = await findOnePostWhereIdAllAttributes(postId)
        user.checkIsAdmin(post.UserId)
        post.imageUrl && deleteLastPostImage(post)
        await post.destroy()
        res.status(200).json("Deletion post is done")
    } catch (err) {
        next(err)
    }
}

exports.likePost = async (req, res, next) => {
    const { likeStatut } = req.body
    const user = req.user
    const postId = req.params.id
    try {
        if (!postId || likeStatut == null) throw { message: 'Missing parameters' }
        const post = await findOnePostWhereIdAllAttributes(postId)
        const alreadyLike = await post.hasUsersLiked(user.id)
        switch (likeStatut) {
            case 0:
                if (!alreadyLike) throw { message: 'Post already not liked' }
                await post.removeUsersLiked(user.id)
                await post.decrement('likes')
                return res.status(200).json('Dislike is done')
            case 1:
                if (alreadyLike) throw { message: 'Post already liked' }
                await post.addUsersLiked(user.id)
                await post.increment('likes')
                return res.status(200).json('Like is done')
            default:
                throw { message: 'Unable to like or dislike' }
        }
    } catch (err) {
        next(err)
    }
}