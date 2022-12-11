const express = require('express')
const db = require('../../models/index')
const Otp =db.otp
//const authentication = require('../../authentication/authentication')
const router = express.Router();
// router.post('/' , authentication , (req,res)=>{
router.post('/' ,(req, res)=>{  
    const { phoneNumber , otp  } = req.body
    
   
})
module.exports =  router




