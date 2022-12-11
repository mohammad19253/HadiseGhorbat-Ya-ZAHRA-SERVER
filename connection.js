const { Sequelize, DataTypes, } = require('sequelize');
const sequelize = new Sequelize('hadisGhorbat', 'postgres', 'postgres', {
    host: 'localhost',
    dialect:'postgres'
  });
 
  
   
  (async () => {
    await sequelize.sync();
    sequelize.authenticate().then(()=>{console.log('connected successfully')}).catch(err=>console.log(err))
    const User = sequelize.define('users', {
      // Model attributes are defined here
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
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
    await User.sync({ alter: true });
    // Find all users
    const users = await User.findAll();
    const user =  USER.create({ phone_number:phoneNumber });
    console.log("Jane's auto-generated ID:", user.id);
    console.log(users.every(user => user instanceof User)); // true
    console.log(users,"All users:", JSON.stringify(users));
    // Code here
 
  })();
  
  
















// const client = new Client( {
//     user:'postgres',
//     password: 'postgres',
//     host:'localhost',
//     port:5432,
//     database:'hadisGhorbat'
// })
// client.connect().then(()=>{console.log('success')})
// module.exports = client;