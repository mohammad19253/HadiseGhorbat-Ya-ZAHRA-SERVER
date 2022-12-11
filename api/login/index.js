const express = require('express')
const db = require('../../models/index')
const Otp = db.otp
const router = express.Router();
router.post('/', (req, res)=>{  
    const { phoneNumber } = req.body
     if (!req.body.phoneNumber) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a otp
      const otp = {
        phone_number: phoneNumber,
        code:Math.floor(100000 + Math.random() * 900000),
        _counter: db.sequelize.literal('_counter + 1') 
      };

      Otp.update(otp,{
        where: { phone_number: phoneNumber },
        returning: true,
        plain: true
      }).then((num) => {
        const result = num[1]
        if (result._counter === 4) {
          res.send( { status:205, message:`برای تلاش مجدد با شماره ${phonenumber} یک دقیقه دیگر تلاش کنید`})
          //must delete the otp row
        } else {
          res.send({message:'opt sent'}) 
        }
      })
      .catch(err => {
        
        Otp.create(     
           {
            phone_number: phoneNumber,
            code:Math.floor(100000 + Math.random() * 900000),
            _counter:1
          }
        )
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Otp."
          });
        });
      });
       
    
 })
module.exports =  router



 