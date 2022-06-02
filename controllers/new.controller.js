const { createNew, findAllNews } = require('../queries/new.queries')

exports.createNew = async (req, res, next) => {
    const user = req.user
    const { text, title } = req.body
    try {
        user.checkIsAdmin()
        if (!text && !title) throw { message: 'Missing parameters' }
        const newNew = await createNew(text, title)
        return res.status(201).json(newNew)
    } catch (err) {
        next(err)
    }
}

exports.getAllNews = async (req, res, next) => {
    try {
        const news = await findAllNews()
        return res.status(200).json(news)
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