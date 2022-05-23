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
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'New',
  });
  return New;
};