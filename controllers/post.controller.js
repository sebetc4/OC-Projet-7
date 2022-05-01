const { getNewPostImagePath, getModifyPostImagePath } = require('../utils/pathFile')
const { createPost, getAllPostsUserAndCommentRestrictedAttributes, getOnePostWhereIdAllAttributes } = require('../queries/post.queries')
const { deleteLastPostImage } = require('../utils/deleteFile')


exports.createPost = async (req, res, next) => {
    const user = req.user
    const { text } = req.body
    try {
        const imageUrl = getNewPostImagePath(req)
        console.log('ttttttttttttttttttttttttttttttttttttt')
        if (!text && !imageUrl) throw { message: 'Missing parameters' }
        const newPost = await createPost(user.id, text, imageUrl)
        return res.status(201).json(newPost)
    } catch (err) {
        next(err)
    }
}

exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await getAllPostsUserAndCommentRestrictedAttributes()
        return res.status(200).json(posts)
    } catch (err) {
        next(err)
    }
}

// Get post's object for updatePost
const getPostObject = (req, text, updateImage) => {
    return updateImage ? ({
        text,
        imageUrl: getModifyPostImagePath(req)
    }) :
        { text }
}

exports.updatePost = async (req, res, next) => {
    const user = req.user
    const { text, updateImage } = req.body
    const postId = req.params.id
    try {
        if (!postId || !text && !req.files) throw { message: 'Missing parameters' }
        const post = await getOnePostWhereIdAllAttributes(postId)
        user.checkAllow(post.UserId)
        const postObject = getPostObject(req, text, updateImage)
        updateImage && post.imageUrl && deleteLastPostImage(post)
        await post.update(postObject);
        return res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

exports.deletePost = async (req, res, next) => {
    const user = req.user
    const postId = req.params.id
    try {
        if (!postId) throw { message: 'Missing parameters' }
        const post = await getOnePostWhereIdAllAttributes(postId)
        user.checkAllow(post.UserId)
        deleteLastPostImage(post)
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
        const post = await getOnePostWhereIdAllAttributes(postId)
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