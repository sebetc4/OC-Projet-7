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
      models.Post.hasMany(models.Comment, {
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
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [1, 500],
          msg: 'Votre post ne doit pas contenir plus de 500 caractères'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true,
  });

  const softDestroyComments = async (user) => {
    const comments = await user.getComments()
    comments.forEach( post => post.destroy())
  }

  Post.beforeDestroy(softDestroyComments);

  return Post;
};