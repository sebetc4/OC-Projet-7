const Sequelize = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentPost extends Model {
    static associate(models) {

      models.CommentPost.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      models.CommentPost.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  }
  CommentPost .init({
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
      modelName: 'CommentPost',
    });
  return CommentPost;
};