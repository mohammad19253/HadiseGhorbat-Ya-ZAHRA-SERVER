
const { DataTypes } = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  const Otp = sequelize.define('otp_code', {
    // Model attributes are defined here
    otp_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
    },
    valid_counter: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      },
    phone_number: {
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'otp_code',

  });
  return Otp
}
