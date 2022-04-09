const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
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
        len: [6, 20]
      }
    },
    userPicture: {
      type: DataTypes.STRING,
    },
    coverPicture: {
      type: DataTypes.STRING,
    },
    bio: DataTypes.STRING,

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  })

  return User;
};