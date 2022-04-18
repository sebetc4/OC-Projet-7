const models = require('../models');

exports.createPost = async (req, res, next) => {
    const { userId, text } = req.body
    const imageUrl = Object.keys(req.files).length !== 0 ? `${req.protocol}://${req.get("host")}/images/post/${req.files.post[0].filename}` : null
    try {
        const newPost = await models.Post.create({
            userId,
            text,
            imageUrl,
        })
        return res.status(201).json({ newPost })
    } catch (err) {
        return res.status(500).json('Unable to create post')
    }
}

exports.getAllPost = async (req, res, next) => {
    if (req.body.userId === null)
        return res.status(400).send('Missing parameters');
    try {
        const posts = await models.Post.findAll()
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).send('Unable to get all posts')
    }
}