const { Sequelize, Model } = require('sequelize');

'use strict';

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
      models.Post.hasMany(models.CommentPost, {
        onDelete: 'cascade',
        foreignKey: 'postId',
        hooks: true
      })
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
    },
    videoUrl: {
      type: DataTypes.STRING
    },
     text: {
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