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
    },
    coverUrl: {
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

  const hashPassword = async (user) => {
    console.log(user.password)
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }

  User.beforeCreate(hashPassword)
  User.beforeUpdate(hashPassword)

  return User;
};