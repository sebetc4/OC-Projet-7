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
  Comment.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [1, 300],
          msg: 'Votre commentaire ne doit pas contenir plus de 300 caractères'
        }
      }
    }
  },
    {
      sequelize,
      modelName: 'Comment',
      paranoid: true,
    });
  return Comment;
};