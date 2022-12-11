
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
      type: DataTypes.STRING,
    },
    reserve_code: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
    },
    
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'reserves',
    initialAutoIncrement:1000
  });
  return Reserve
  
}
