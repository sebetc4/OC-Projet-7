const { Sequelize, Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            models.Message.belongsTo(models.User, {
                foreignKey: "senderId",
            });
            models.Message.belongsTo(models.Conversation, {
                foreignKey: "conversationId",
            });
        }
    }
    Message.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};