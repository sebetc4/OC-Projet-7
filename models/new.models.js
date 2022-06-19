const { Sequelize, Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    static associate(models) {
    }
  }
  New.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [1, 200],
        msg: 'Votre titre ne doit pas contenir plus de 200 caractères'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'New',
  });
  return New;
};