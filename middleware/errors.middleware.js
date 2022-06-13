module.exports = ((err, req, res, next) => {
    if (err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError')
        sequelizeErrors(err, res)
    else if (err.message)
        othersErrors(err, res)
    else if (process.env.NODE_ENV !== 'production')
        res.status(500).json(err.message)
    else
        res.status(500).json('Internal server error')
})

const sequelizeErrors = (err, res) => {
    res.status(500).json({ path: err.errors[0].path, error: err.errors[0].message })
}

const othersErrors = (err, res) => {
    switch (err.message) {
        case 'Missing parameters':
            res.status(400).json('Missing parameters')
            break
        case 'Invalid token':
            res.status(401).json('Invalid token')
            break
        case 'Invalid password':
            res.status(403).json({ path: 'password', error: 'Mot de passe invalide' })
            break
        case 'Post already liked':
            res.status(403).json('Post already liked')
            break
        case 'Post already not liked':
            res.status(403).json('Post already not liked');
            break
        case 'Image and video in same post is not allowed':
            res.status(403).json('Image and video in same post is not allowed');
            break
        case 'Email unknown':
            res.status(403).json({ path: 'email', error: 'Adresse mail inconnue' });
            break
        case `Conversation already exist`:
            res.status(403).json(`Conversation already exist`);
            break
        case 'Account disabled':
            res.status(403).json({ path: 'accountDisabled', error: 'Account disabled' });
            break
        case 'Image format not allowed':
            res.status(403).json('Image format not allowed');
            break
        case 'Only Youtube\'s videos are allowed':
            res.status(403).json('Only Youtube\'s videos are allowed');
            break
        case 'User id unknown':
            res.status(404).json(`User id unknown`)
            break
        case `Post id unknown`:
            res.status(404).json('Post id unknown')
            break
        case `Comment id unknown`:
            res.status(404).json('Comment id unknown')
            break
        case `Company new id unknown`:
            res.status(404).json(`Company new id unknown`)
            break
        case 'Not allowed!':
            res.status(405).json('Not allowed!')
            break
        case 'Unable to like or dislike':
            res.status(500).json('Unable to like or dislike')
            break
        default:
            if (process.env.NODE_ENV !== 'production')
                res.status(500).json(err.message)
            else
                res.status(500).json('Internal server error')
    }
}