const Sequelize = require('sequelize');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
    }
  }
  Post.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }, text : {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  const hashPassword = async (user) => {
    console.log(user.password)
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }

  Post.beforeCreate(hashPassword)
  Post.beforeUpdate(hashPassword)

  return Post;
};