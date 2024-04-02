const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const ReservedTableDate = sequelize.define('ReservedTableDate', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  numberOfTableReserved: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = ReservedTableDate;
