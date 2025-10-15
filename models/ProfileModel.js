const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Profile = connection.define('profile', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = { Profile };