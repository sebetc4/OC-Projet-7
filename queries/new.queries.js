const { New } = require('../models');
const Sequelize = require('sequelize');

exports.createNew = async (title, text) => {
    const newCompNew = await New.create({
        title,
        text
    })
    if (newCompNew)
        return newCompNew
    else
        throw { message: `Internal Server Error` }
}

exports.findAllNewsAllAttributes = async () => {
    const compNews = await New.findAll({
        order: [['createdAt', 'DESC']],
    })
    if (compNews)
        return compNews
    else
        return null
};

