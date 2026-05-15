'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Item, {
        foreignKey: 'item_id',
        as: 'item'
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Comment.init({
     item_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {

    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    paranoid: true

  });
  return Comment;
};