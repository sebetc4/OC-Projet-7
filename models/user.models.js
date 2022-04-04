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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce pseudo est déjà utilisé',
      },
      validate: {
        len: [4, 20]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },
    picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
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