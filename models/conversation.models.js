const { Sequelize, Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        static associate(models) {
            models.Conversation.belongsTo(models.User, {
                foreignKey: 'firstUserId',
                as: 'firstUser'
            });
            models.Conversation.belongsTo(models.User, {
                foreignKey: 'secondUserId',
                as: 'secondUser'
            });
        }
    }
    Conversation.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'Conversation',
    });
    return Conversation;
};