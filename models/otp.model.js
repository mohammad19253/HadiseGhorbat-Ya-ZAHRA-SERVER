
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
    _counter: {
        type: DataTypes.BIGINT,
        defaultValue: DataTypes.BIGINT,
        allowNull: false,
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
