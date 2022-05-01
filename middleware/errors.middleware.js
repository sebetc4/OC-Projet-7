module.exports = ((err, req, res, next) => {
    if (err.name === "SequelizeValidationError")
        sequelizeErrors(err, res)
    else if (err.message)
        othersErrors(err, res)
    res.status(500).json(err.message)
})

const sequelizeErrors = (err, res) => {
    res.status(500).json({ path: err.errors[0].path, error: err.errors[0].message })
}

const othersErrors = (err, res) => {
    switch (err.message) {
        case 'Missing parameters':
            res.status(400).json('Missing parameters')
        case 'Unauthorized':
            res.status(401).json('Unauthorized')
        case 'Invalid password':
            res.status(403).json({ path: 'password', message: 'Invalid password' })
        case 'Post already liked':
            res.status(403).json('Post already liked')
        case 'Post already not liked':
            res.status(403).json('Post already not liked');
        case 'User id unknown':
            res.status(404).send(`User id unknown`)
        case `Post id unknown`:
            res.status(404).send('Post id unknown')
        case `Comment id unknown`:
            res.status(404).send('Comment id unknown')
        case 'Not allowed!':
            res.status(405).send('Not allowed!')
        case 'Unable to like or dislike':
            res.status(500).json('Unable to like or dislike')
        default:
            res.status(500).json(err.message)
    }
}