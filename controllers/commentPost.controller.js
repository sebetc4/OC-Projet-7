exports.createComment = async (req, res, next) => {
    const { userId, text } = req.body
    if (!userId)
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
        await post.addPostsCommented(user, {text})
        return res.status(201).json('create comment')
    } catch (err) {
        return res.status(500).json('Unable to create post')
    }
}