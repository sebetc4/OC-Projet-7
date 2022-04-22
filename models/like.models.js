const Sequelize = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  }
  Like.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};