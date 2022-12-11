const express = require('express')
const client = require('./../../connection.js')
const bcrypt = require('bcrypt');
const authentication = require('../../authentication/authentication')

const router = express.Router();

router.post('/' , authentication , (req,res)=>{
    const {username , password , email , birthday, gender, privacy } = req.body;
  

   
  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('req.phoneNumber',req.phoneNumber)
    const isAll= Object.values(req.body).length === 6
    const isEmpty = Object.values(req.body).some(item =>item === '')
  
    if(!isEmpty && isAll){
        client.query(`insert into users
         (user_name , password ,birthday, gender ,privacy ,email , phone_number) 
        values
         ('${username}','${hash}','${birthday}','${gender}', '${privacy}', '${email}', '${req.phoneNumber.phoneNumber}')

         `,(err,result)=>{
            if(!err){
                res.json({status:200,message:result})
            }else{
                res.json({status:210,message:err})
            }
        })
    }else{
        res.json({status:210,message:'فرم را به درستی پر کنید'})
    }
    
})  

module.exports =  router




