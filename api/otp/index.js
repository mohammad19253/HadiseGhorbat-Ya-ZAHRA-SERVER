const express = require('express')
const db = require('../../models/index')
const Otp =db.otp
const User =db.users
//const authentication = require('../../authentication/authentication')
const router = express.Router();
// router.post('/' , authentication , (req,res)=>{
router.post('/' ,(req, res)=>{  
    const { phoneNumber , otp ,id } = req.body
    let user ={exist:false,firstName:'',lastName:''}
    User.findAll({where:{phone_number:phoneNumber}}).then(data=>{
        if(data.length === 1){
             user ={exist:true,firstName:data[0].first_name,lastName:data[0].last_name, id:data[0].user_id}
        }else{
             User.create({phone_number:phoneNumber}).then((test=>{
                user ={exist:false, id:test.user_id}
             }))
        }   
    })
 
    Otp.findAll({where:{phone_number:phoneNumber}}).then((data=>{
        if( data[0]?.code === otp ){
            //correct otp
            res.send({status:200, message:'موفقیت امیز ',data:user})
        }else{
            //wrong otp
            res.send({ status:210, message:'کد وارد شده اشتباه میباشد',data:user})
        }
    })).catch(err=>{
        //opt_id not found
        res.send({status:205,message:'لطفا دوباره تلاش کنید',data:user})
        console.log(err)
    })
})
module.exports =  router




