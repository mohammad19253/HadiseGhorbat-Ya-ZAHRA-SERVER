const express = require('express')
const client = require('./../../connection.js')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const authentication = require('../authentication/authentication')
const router = express.Router();
// router.post('/' , authentication , (req,res)=>{
router.post('/' , (req,res)=>{
    console.log(req.body)
    const { days, firstName,lastName, phoneNumber, } = req.body;
        client.query(`select user_id from users where phone_number ='${phoneNumber}'` , (err,result)=>{
            // user_id
            if(!err){
                if(result.rows.length === 1){
                    const user_id = result.rows[0].user_id
                    days.forEach(item=>{
                    const reserve_code = bcrypt.hashSync(`"user_id":"${user_id}",${JSON.stringify(item)}`, salt);
                        client.query(`insert into reserves
                        (user_id, reserve_code, male_count, female_count, _day ) 
                       values
                        ( '${user_id}','${reserve_code}','${item.maleCount}', '${item.femaleCount}', '${item.text}')
                    
                        `,(error, )=>{
                           if(error){
                                console.log('error',error)
                           }else{
                                res.json( { status:200, message:'reserved' , reserve_code:reserve_code})
                           }
                       })
                    })
                   
                }   
                 //user not found
                else if (result.rows.length === 0){
                    client.query(`insert into users  (phone_number, first_name, last_name )
                     values ('${phoneNumber}', '${firstName}', '${lastName}' )` ,(err1,result1)=>{
                        if(!err1){
                            client.query(`select user_id from users where phone_number ='${phoneNumber}'` , 
                            (err2,result2)=>{
                                // user_id
                                if(!err2){
                                    const user_id = result2.rows[0].user_id
                                    days.forEach(item=>{
                                    const reserve_code = bcrypt.hashSync(`"user_id":"${user_id}",${JSON.stringify(item)}`, salt);
                                        client.query(`insert into reserves
                                        (user_id, reserve_code, male_count, female_count, _day ) 
                                       values
                                        ( '${user_id}','${reserve_code}','${item.maleCount}', '${item.femaleCount}', '${item.text}')
                                    
                                        `,(err3,result3)=>{
                                           if(err3){
                                                console.log('error',err3)
                                           }else{
                                            console.log('result3',result3)                                           }
                                       })
                                    }) 
                                }else{
                                //error
                                    
                                }
                            })
                        }else{
                          console.log(err)
                       }
                      })
                    res.json( { status:400, message:'user not found'})
                }else{
                    //not possible ever never
                    res.json( { status:400, message:'duplicate'})
                }
            }else{
            //error
                res.json( { status:400, message:err})
            }
        })


        
})  
module.exports =  router




