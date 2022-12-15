const express = require('express')
const db = require('../../models/index')
const Otp =db.otp
const User =db.users
//const authentication = require('../../authentication/authentication')
const router = express.Router();
// router.post('/' , authentication , (req,res)=>{
router.post('/' ,(req, res)=>{  
    const { phoneNumber , otp ,id } = req.body
 
    Otp.findAll({where:{phone_number:phoneNumber}}).then((data=>{
        if( data[0]?.code === otp ){
            //correct otp
            User.findAll({where:{phone_number:phoneNumber}}).then(data=>{
                if(data.length === 1){
                     const user ={exist:true,firstName:data[0].first_name,lastName:data[0].last_name, id:data[0].user_id}
                     res.send({status:200, message:'موفقیت امیز ',data:user}) 
                    }else{
                     User.create({phone_number:phoneNumber}).then((test=>{
                        const user ={exist:false, id:test.user_id}
                        res.send({status:200, message:'موفقیت امیز ',data:user}) 
                     })).catch((err)=>{
                        res.send({ status:210, message:'لطفا دوباره تلاش کنید',data:{}})
                     })
                }   
            })
        }else{
            res.send({ status:210, message:'کد وارد شده اشتباه میباشد',data:user})
        }
    })).catch(err=>{
        res.send({status:205,message:'لطفا دوباره تلاش کنید',data:user})
    })
})
module.exports =  router




