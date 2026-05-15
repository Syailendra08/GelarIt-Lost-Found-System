'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasMany(models.Item, {
        foreignKey: 'locations_id',
        as: 'items'
      });
    }
  }
  Location.init({
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
    modelName: 'Location',
    tableName: 'locations',
    timestamps: true,
    paranoid: true
  });
  return Location;
};