const express = require('express')
const https = require('https');


const db = require('../../models/index')
const Otp = db.otp
const router = express.Router();
router.post('/', (req, res)=>{  
    const { phoneNumber } = req.body
    const OTP_CODE =Math.floor(100000 + Math.random() * 900000)
     if (!req.body.phoneNumber) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a otp
      const otp = {
        phone_number: phoneNumber,
        code:OTP_CODE,
      };
      const text=`:کد ورود${otp.code} \nرزرو صندلی تئاتر حدیث غربت فاطمیه1401   \n  `
      const thirdParydata = JSON.stringify({
        from:'50004001380293',
        to:  phoneNumber,
        text: text
      });
      const options = {
        hostname: 'console.melipayamak.com',
        port: 443,
        path: '/api/send/simple/71809976621d45bea3d7a84b3ca0c87d',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
      Otp.update(otp,{
        where: { phone_number: phoneNumber },
        returning: true,
        plain: true,
      }).then((num) => {
        const req = https.request(options, res => {
          console.log('statusCode: ' + res.statusCode);
          res.on('data', d => {
              process.stdout.write(d)
          });
        });
        req.on('error', error => {
            console.error(error);
        });
        console.log('data to send', thirdParydata)
        req.write(thirdParydata);
        req.end();
        const result = num[1]
        res.send({message:'update otp',status:200,otp_id:result.otp_id}) 
      })
      .catch(err => {
        Otp.create({
          phone_number: phoneNumber,
          code:OTP_CODE
        })
        .then(data => {
          const req = https.request(options, res => {
            console.log('statusCode: ' + res.statusCode);
            res.on('data', d => {
                process.stdout.write(d)
            });
          });
          req.on('error', error => {
              console.error(error);
          });
          console.log('data to send', thirdParydata)
          req.write(thirdParydata);
          req.end();
          res.send({message:'new otp',status:200,otp_id:data.otp_id}) 
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



 