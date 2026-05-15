'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Item, {
        foreignKey: 'categories_id',
        as: 'items'
      })
    }
  }
   Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  }, {

    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid: true

  });
  return Category;
};