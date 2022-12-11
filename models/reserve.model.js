
const { DataTypes } = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  const Reserve = sequelize.define('reserves', {
    // Model attributes are defined here
    reserve_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    male_count: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    female_count: {
        type: DataTypes.INTEGER,
        defaultValue:0,
      },
    day: {
      type: Sequelize.ENUM("0", "1", "2","3","4","5"),
    },
    reserve_code: {
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'reserves'
  });
  return Reserve
}
