const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../models');

exports.search = async (req, res, next) => {
    const query = req.query.query
    var options = {
        where: {
          text: {
            [Op.like]: `%${query}%`
          }
        }
      };
      const results = await models.Post.findOne(options)
      return res.status(200).json(results)
}