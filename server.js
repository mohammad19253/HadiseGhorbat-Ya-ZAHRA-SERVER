

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
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

server.use(cors(corsOpts));
server.use('/reserve', require('./api/reserve')) 
server.use('/login', require('./api/login'))    
server.use('/otp', require('./api/otp'))    

server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
})