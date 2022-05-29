'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    sender_name: DataTypes.STRING,
    sender_email: DataTypes.STRING,
    sender_phonenumber: DataTypes.STRING,
    receiver_name: DataTypes.STRING,
    receiver_email: DataTypes.STRING,
    receiver_phonenumber: DataTypes.STRING,
    pickup_address: DataTypes.STRING,
    dropoff_address: DataTypes.STRING,
    size: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};