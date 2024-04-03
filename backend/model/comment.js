const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const comment = sequelize.define('comment', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true, // Set this to true or false depending on your requirements
  },
});

module.exports = comment;
