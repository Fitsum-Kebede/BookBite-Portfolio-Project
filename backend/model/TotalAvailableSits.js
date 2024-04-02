const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const TotalAvailableSit = sequelize.define('TotalAvailableSit', {
    totalNumberOfSitsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = TotalAvailableSit;
