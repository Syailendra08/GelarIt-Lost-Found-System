'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Item.belongsTo(models.Category, {
        foreignKey: 'categories_id',
        as: 'category'
      });

      Item.belongsTo(models.Location, {
        foreignKey: 'locations_id',
        as: 'location'
      });

      Item.belongsTo(models.User, {
        foreignKey: 'finder_id',
        as: 'finder'
      });

      Item.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        as: 'receiver'
      });

      Item.hasMany(models.Comment, {
        foreignKey: 'item_id',
        as: 'comments'
      });

      Item.hasMany(models.Request, {
        foreignKey: 'item_id',
        as: 'requests'
      });

    }
  }
  Item.init({

    categories_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    locations_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    finder_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    image: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('image');
      return rawValue ? `http://localhost:3000/uploads/${rawValue}` : null;
    }
},
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'lost',
        'found',
        'claimed',
        'taken',
        'swapped'
      ),
      allowNull: false,
      defaultValue: 'lost'
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: true,
    paranoid: true
  });
  return Item;
};