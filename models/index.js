const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('hadisGhorbat', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect:'postgres'
// });
const sequelize = new Sequelize('Hadis_ghorbat', 'postgres', 'H@JMerfan*(110)*', {
  host: 'localhost',
  dialect:'postgres'
});
  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.users = require("./users.model")(sequelize, Sequelize);
db.otp = require("./otp.model")(sequelize, Sequelize);
db.reserves = require("./reserve.model")(sequelize, Sequelize);
module.exports = db; 
 
  
  













