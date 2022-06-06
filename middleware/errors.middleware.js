module.exports = ((err, req, res, next) => {
    if (err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError')
        sequelizeErrors(err, res)
    else if (err.message)
        othersErrors(err, res)
    else if (process.env.NODE_ENV !== 'production')
        res.status(500).json(err.message)
    res.status(500).json('internal server error')
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
            res.status(403).json({ path: 'password', error: 'Mot de passe invalide' })
        case 'Post already liked':
            res.status(403).json('Post already liked')
        case 'Post already not liked':
            res.status(403).json('Post already not liked');
        case 'Image and video in same post is not allowed':
            res.status(403).json('Image and video in same post is not allowed');
        case 'Email unknown':
            res.status(403).json({ path: 'email', error: 'Adresse mail inconnue' });
        case `Conversation already exist`:
            res.status(403).json(`Conversation already exist`);
        case 'User id unknown':
            res.status(404).send(`User id unknown`)
        case `Post id unknown`:
            res.status(404).send('Post id unknown')
        case `Comment id unknown`:
            res.status(404).send('Comment id unknown')
        case `Company new id unknown`:
            res.status(404).send(`Company new id unknown`)
        case 'Not allowed!':
            res.status(405).send('Not allowed!')
        case 'Unable to like or dislike':
            res.status(500).json('Unable to like or dislike')
        default:
            if (process.env.NODE_ENV !== 'production')
                res.status(500).json(err.message)
            res.status(500).json('internal server error')
    }
}