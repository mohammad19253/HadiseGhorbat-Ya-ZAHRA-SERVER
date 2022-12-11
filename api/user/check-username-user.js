const express = require('express')
const authentication = require('../../authentication/authentication')
const client = require('../../connection')
const router = express.Router();
router.post('/',authentication, (req,res)=>{
    const { username } = req.body;
    
    if(username !==''){
        client.query(`select user_name from users where user_name = '${username}'`,(err,result)=>{
            if( result.rows.length === 1){
                res.json({status:205,message:'این نام کاربری وجود دارد'})
            }else{
                res.json({status:200,message:'نام کاربری مورد تایید میباشد'})
            }
        })
    }else{
        res.json({status:210,message:'نام کاربری را وارد کنید'})
    }
    
})  

module.exports =  router