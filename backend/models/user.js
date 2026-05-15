'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {

      User.hasMany(models.Item, {
        foreignKey: 'finder_id',
        as: 'foundItems'
      });

      User.hasMany(models.Item, {
        foreignKey: 'receiver_id',
        as: 'receivedItems'
      });

      User.hasMany(models.Request, {
        foreignKey: 'user_id'
      });

      User.hasMany(models.Comment, {
        foreignKey: 'user_id'
      });

      User.hasMany(models.Notification, {
        foreignKey: 'user_id'
      });
    }
  }
    User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM("admin", "student"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true
  });
  return User;
};