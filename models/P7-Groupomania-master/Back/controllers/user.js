// Bcrypt:
const bcrypt = require("bcrypt");

// Jsonwebtoken d'authentification:
const jwt = require("jsonwebtoken");

// Import du models user:
const models = require('../models')

exports.signup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const bio = req.body.bio;
    const admin = req.body.admin;

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    console.log(req.body);
    try {
        models.User.findOne({
            attributes: ['email'],
            where: { email: email, },
        })

            .then(
                ((userFound) => {
                    if (!userFound) {
                        bcrypt.hash(password, 10, function (err, bcryptPassword) {
                            const newUser = models.User.create({
                                username: username,
                                email: email,
                                password: bcryptPassword,
                                bio: bio,
                                admin: false,
                            })

                                .then((newUser) => {
                                    res.status(201).json({
                                        userId: newUser.id,
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        error: "Impossible d'ajouter un utilisateur",
                                    });
                                });
                        });
                    } else {
                        return res.status(409).json({
                            error: "Ce compte existe déjà ",
                        });
                    }
                }).catch((err) =>
                    res.status(500).json({
                        err: err + "Impossible de vérifier l'utilisateur",
                    })
                )
            );
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};