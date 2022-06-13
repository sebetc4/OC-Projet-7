const { createCompanyNew, findAllCompanyNews, findOneCompanyNewWhereId } = require('../queries/companyNew.queries')

exports.createCompanyNew = async (req, res, next) => {
    const user = req.user
    const { text, title } = req.body
    try {
        if (!text || !title)
            throw { message: 'Missing parameters' }
        user.checkIsAdmin()
        const companyNew = await createCompanyNew(title, text)
        return res.status(201).json(companyNew)
    } catch (err) {
        next(err)
    }
}

exports.getAllCompanyNews = async (req, res, next) => {
    try {
        const allCompanyNews = await findAllCompanyNews()
        return res.status(200).json(allCompanyNews)
    } catch (err) {
        next(err)
    }
}


exports.updateCompanyNew = async (req, res, next) => {
    const user = req.user
    const { text, title } = req.body
    const companyNewId = req.params.id
    try {
        if (!text || !title || !companyNewId)
            throw { message: 'Missing parameters' }
        user.checkIsAdmin()
        const companyNew = await findOneCompanyNewWhereId(companyNewId)
        const updatedCompanyNew = await companyNew.update({title, text})
        return res.status(200).json(updatedCompanyNew)
    } catch (err) {
        next(err)
    }
}

exports.deleteCompanyNew = async (req, res, next) => {
    const user = req.user
    const companyNewId = req.params.id
    try {
        if (!companyNewId)
            throw { message: 'Missing parameters' }
        user.checkIsAdmin()
        const companyNew = await findOneCompanyNewWhereId(companyNewId)
        await companyNew.destroy()
        res.status(200).json("Deletion company nex success")
    } catch (err) {
        next(err)
    }
}