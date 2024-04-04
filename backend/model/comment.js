const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
 
// comment model
// Declare a variable for the model and add the field names
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
  // for future use
  status: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

module.exports = comment;
