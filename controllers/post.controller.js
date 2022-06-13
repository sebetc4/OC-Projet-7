const { getPostImagePath } = require('../utils/pathFile')
const { createPost, findAllPostsUserLikeAndComment, findOnePostWhereId } = require('../queries/post.queries')
const { deleteLastPostImage } = require('../utils/deleteFile')

const checkAllowedVideo = (videoUrl) => {
    if (videoUrl.includes('https://www.youtube') || videoUrl.includes('https://youtube'))
        return true
    else
        return false
}

exports.createPost = async (req, res, next) => {
    const user = req.user
    const { text, video: videoUrl } = req.body
    try {
        const imageUrl = await getPostImagePath(req)
        if (!text && !imageUrl && !videoUrl)
            throw { message: 'Missing parameters' }
        if (!checkAllowedVideo(videoUrl))
            throw { message: 'Only Youtube\'s videos are allowed' }
        if (imageUrl && videoUrl)
            throw { message: 'Image and video in same post is not allowed' }
        const newPost = await createPost(user.id, text, imageUrl, videoUrl)
        return res.status(201).json(newPost)
    } catch (err) {
        next(err)
    }
}

exports.getAllPosts = async (req, res, next) => {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    try {
        const posts = await findAllPostsUserLikeAndComment(offset, limit)
        return res.status(200).json(posts)
    } catch (err) {
        next(err)
    }
}

// Get post's object for updatePost
const getPostObject = async (req, text, videoUrl, updateImage) => {
    return (updateImage === 'true') ? ({
        text,
        videoUrl,
        imageUrl: await getPostImagePath(req)
    }) :
        {
            text,
            videoUrl
        }
}

exports.updatePost = async (req, res, next) => {
    const user = req.user
    const { text, updateImage, video: videoUrl } = req.body
    const postId = req.params.id
    try {
        if (!postId || !text && !req.files.post)
            throw { message: 'Missing parameters' }
        const post = await findOnePostWhereId(postId)
        user.checkIsAuthorOrAdmin(post.UserId)
        const postObject = await getPostObject(req, text, videoUrl, updateImage)
        if ((postObject.imageUrl && post.videoUrl) || (postObject.videoUrl && (postObject.imageUrl || (post.imageUrl && !updateImage))))
            throw { message: 'Image and video in same post is not allowed' }
        if (updateImage === 'true' && post.imageUrl)
            deleteLastPostImage(post)
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
        if (!postId)
            throw { message: 'Missing parameters' }
        const post = await findOnePostWhereId(postId)
        user.checkIsAuthorOrAdmin(post.UserId)
        post.imageUrl && deleteLastPostImage(post)
        await post.destroy()
        res.status(200).json("Deletion post success")
    } catch (err) {
        next(err)
    }
}

exports.likePost = async (req, res, next) => {
    const { likeStatut } = req.body
    const user = req.user
    const postId = req.params.id
    try {
        if (!postId || likeStatut == null)
            throw { message: 'Missing parameters' }
        const post = await findOnePostWhereId(postId)
        const alreadyLike = await post.hasUsersLiked(user.id)
        switch (likeStatut) {
            case 0:
                if (!alreadyLike) throw { message: 'Post already not liked' }
                await post.removeUsersLiked(user.id)
                return res.status(200).json('Dislike success')
            case 1:
                if (alreadyLike) throw { message: 'Post already liked' }
                await post.addUsersLiked(user.id)
                return res.status(200).json('Like success')
            default:
                throw { message: 'Unable to like or dislike' }
        }
    } catch (err) {
        next(err)
    }
}