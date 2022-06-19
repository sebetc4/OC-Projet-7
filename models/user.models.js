const bcrypt = require("bcrypt");
const { Sequelize, Model } = require('sequelize');

'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, {
        onDelete: 'cascade',
        hooks: true
      })
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'userId',
        as: 'postsLiked'
      })
      models.User.hasMany(models.Comment, {
        onDelete: 'cascade',
        foreignKey: 'userId',
        hooks: true
      })
      models.User.hasMany(models.Todo, {
        onDelete: 'cascade',
        hooks: true
      })
      models.User.belongsToMany(models.User, {
        foreignKey: 'userId',
        as: 'followers',
        through: 'Followers',
        onDelete: 'cascade',
        hooks: true
      })
      models.User.belongsToMany(models.User, {
        foreignKey: 'followerId',
        as: 'following',
        through: 'Followers',
        onDelete: 'cascade',
        hooks: true
      })
      models.User.hasMany(models.Conversation, {
        foreignKey: 'firstUserId',
      });
      models.User.hasMany(models.Conversation, {
        foreignKey: 'secondUserId',
      });
      models.User.hasMany(models.Message, {
        foreignKey: 'senderId',
      });
    }
    checkPassword = (password) => {
      if (!bcrypt.compareSync(password, this.password)) {
        throw { message: "Invalid password" };
      }
    }
    hashNewPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hashSync(password, salt);
    }
    checkIsAuthor = (targetId) => {
      if (this.id !== targetId)
        throw { message: 'Not allowed!' }
    }
    checkIsAuthorOrAdmin = (targetId) => {
      if (this.id !== targetId && !this.isAdmin)
        throw { message: 'Not allowed!' }
    }
    checkIsAdmin = () => {
      if (!this.isAdmin)
        throw { message: 'Not allowed!' }
    }
  }
  User.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce mail est déjà utilisé',
      },
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: 'Votre nom doit contenir entre 2 et 20 caractères'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: 'Votre prénom doit contenir entre 2 et 20 caractères'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Votre mot de passe doit contenir entre 6 et 100 caractères'
        }
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 500],
          msg: 'Votre bio ne doit pas contenir plus de 500 caractères'
        }
        
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });

  const hashPassword = async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }

  const softDestroyPosts = async (user) => {
    const posts = await user.getPosts()
    posts.forEach( post => post.destroy())
  }

  User.beforeCreate(hashPassword)
  User.beforeDestroy(softDestroyPosts)

  return User;
};