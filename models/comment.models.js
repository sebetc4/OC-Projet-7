const Sequelize = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  }
  Comment .init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING
    }
  },
    {
      sequelize,
      modelName: 'Comment',
    });
  return Comment;
};