const { Sequelize, Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      models.Todo.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Todo.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Votretodo ne doit pas contenir plus de 500 caractères'
        }
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};