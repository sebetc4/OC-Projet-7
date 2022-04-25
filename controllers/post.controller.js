const models = require('../models');
const attributes = require('../utils/attributes')
const paths = require('../utils/paths')
const fs = require('fs')



// Create constroller
exports.createPost = async (req, res, next) => {
    const { userId, text } = req.body
    const imageUrl = Object.keys(req.files).length !== 0 ? `${paths.getImagesPath(req)}/post/${req.files.post[0].filename}` : null
    if (!userId)
        return res.status(400).send('Missing parameters');
    try {
        const newPost = await models.Post.create({
            UserId: userId,
            text,
            imageUrl,
        })
        return res.status(201).json(newPost)
    } catch (err) {
        return res.status(500).json('Unable to create post')
    }
}


// Get controller
exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await models.Post.findAll({
            include: [{
                model: models.User,
                attributes: attributes.userInPost
            }, {
                model: models.User,
                as: 'usersLiked',
                attributes: ['id'],
                through: {
                    attributes: [],
                }
            }, {
                model: models.CommentPost,
                include: {
                    model: models.User,
                    attributes: attributes.userInPost
                }
            }]
        })
        console.log(posts)
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).send('Unable to get all posts')
    }
}


// Modify controller
const deleteLastFile = (req, post) => {
    fs.unlink(`images/post/${post.imageUrl.split(`/images/post/`)[1]}`, (err) => {
        if (err)
            console.log(err)
    })
}

const getPostObject = (req, updateImage) => {
    return updateImage ? ({
        text: req.body.text,
        imageUrl: req.files ? `${paths.getImagesPath(req)}/post/${req.files.post[0].filename}` : null
    }) :
        {
            text: req.body.text,
        }
}


exports.modifyPost = async (req, res, next) => {
    const { userId, text, updateImage } = req.body
    const postId = req.params.id
    if (!userId)
        return res.status(400).send('Missing parameters');
    try {
        const post = await models.Post.findOne({
            where: { id: postId}, 
        })
        if (!post) {
            return res.status(404).send(`Post Id unknown ${postId}`)
        }
        const postObject = getPostObject(req, updateImage)
        updateImage && deleteLastFile(req, post)
        await post.update(postObject);
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json('Unable to modify post')
    }
}


// Delete controller
exports.deletePost = async (req, res, next) => {
    try {
        const post = await models.Post.findOne({
            where: { id: req.params.id }
        })
        await post.destroy()
        res.status(200).json("Deletion post is done")
    } catch (err) {
        return res.status(500).send('Unable to delete post')
    }
}


// Like controller
const setLike = async (post, user) => {
    await post.addUsersLiked(user)
    await post.update({
        likes: post.likes + 1,
    })
}

const setDislike = async (post, user) => {
    await post.removeUsersLiked(user)
    await post.update({
        likes: post.likes - 1,
    })
}


exports.likePost = async (req, res, next) => {
    const { userId, likeStatut } = req.body
    if (!userId || likeStatut == null)
        return res.status(400).send('Missing parameters');
    try {
        const post = await models.Post.findOne({
            where: { id: req.params.id }
        })
        if (!post)
            return res.status(404).send(`Post id unknown ${req.params.id}`)
        const user = await models.User.findOne({
            where: { id: userId }
        })
        if (!user)
            return res.status(404).send(`User id unknown ${userId}`)
        const alreadyLike = await post.hasUsersLiked(user)

        switch (likeStatut) {
            case 0:
                if (!alreadyLike)
                    return res.status(403).json('Post already not liked');
                await setDislike(post, user)
                return res.status(200).json('Dislike is done')
            case 1:
                if (alreadyLike)
                    return res.status(403).json('Post already liked');
                await setLike(post, user)
                return res.status(200).json('Like is done')
            default:
                return res.status(500).json('Unable to like or dislike');
        }
    } catch (err) {
        return res.status(500).json('Unable to like or dislike');
    }
}