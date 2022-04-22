const Sequelize = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        as: 'usersLiked'
      });
      models.Post.belongsToMany(models.User, {
        through: models.CommentPost,
        foreignKey: 'postId',
        as: 'usersCommented'
      });
    }
  }
  Post.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING
    }, text: {
      type: DataTypes.STRING
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};