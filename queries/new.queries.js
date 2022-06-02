const { New } = require('../models')

exports.createNew = async (title, text) => {
    const newNew = await New.create({
        title,
        text
    })
    if (newNew)
        return newNew
    else
        throw { message: `Internal Server Error` }
}

exports.findAllNews = async () => {
    const news = await New.findAll({
        order: [['createdAt', 'DESC']],
    })
    if (news)
        return news
    else
        return null
};

