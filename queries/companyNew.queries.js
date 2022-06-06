const { New } = require('../models')

exports.createCompanyNew = async (title, text) => {
    const companyNew = await New.create({
        title,
        text
    })
    if (companyNew)
        return companyNew
    else
        throw { message: `Internal Server Error` }
}

exports.findOneCompanyNewWhereId = async (id) => {
    const companyNews = New.findByPk(id)
    if (!companyNews)
        throw { message: `Company new id unknown` }
    else
        return companyNews
}

exports.findAllCompanyNews = async () => {
    const allCompanyNews = await New.findAll({
        order: [['createdAt', 'DESC']],
    })
    if (allCompanyNews)
        return allCompanyNews
    else
        return null
};

