
const { DataTypes } = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'users'
  });
  return User
}
