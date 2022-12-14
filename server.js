

const express = require('express')
const cors = require('cors');
const db = require("./models/index");
const port = parseInt(process.env.PORT, 10) || 4123
const server = express()
server.use(express.json());
//db.sequelize.sync({alter:true})
db.sequelize.sync()
.then(() => { console.log("Synced db.");})
.catch((err) => { console.log("Failed to sync db: " + err.message);});

//server.use('/user', require('./api/user'))
server.use(cors({
    //this should change to 181....
    origin:['http://localhost:3001', 'http://localhost:3000' ,'http://185.181.182.171:3000'] 
  }));
server.use('/reserve', require('./api/reserve')) 
server.use('/login', require('./api/login'))    
server.use('/otp', require('./api/otp'))    

server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
})