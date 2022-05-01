// Middleware d'authentification
module.exports = (req, res, next) => {
    req.user ? next() : next({message : 'Unauthorized' })
};
