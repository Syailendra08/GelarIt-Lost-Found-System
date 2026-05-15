'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Request.belongsTo(models.Item, {
        foreignKey: 'item_id',
        as: 'item'
      });
      Request.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Request.init({
     item_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'processed',
        'approved',
        'rejected',
        'completed'
      ),
      allowNull: false,
      defaultValue: 'pending'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {

    sequelize,
    modelName: 'Request',
    tableName: 'requests',
    timestamps: true,
    paranoid: true
  });
  return Request;
};