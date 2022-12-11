const { DataTypes } = require('sequelize')
const express = require('express')
const bcrypt = require('bcrypt');
const db = require('../../models/index')

const router = express.Router();
//const authentication = require('../authentication/authentication')
const Reserve =db.reserves
const User =db.users
const salt = bcrypt.genSaltSync(10);
// router.post('/' , authentication , (req,res)=>{
router.post('/' , (req,res)=>{
    console.log(req.body)
    const { days, firstName,lastName, phoneNumber, } = req.body;
    //QC should validate more clearly
    if (!req.body.phoneNumber) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    User.findAll({where:{phone_number:phoneNumber}}).then(data=>{
        console.log('datauser_id',data.user_id)
        days.forEach(item=>{
             Reserve.create({
                user_id:data[0].user_id,
                male_count:item.maleCount,
                female_count:item.female_count,
                day:item.text,
            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
        })
       
    }).catch(err=>{
        console.log(err)
    })
})  
module.exports =  router

// client.query(`select user_id from users where phone_number ='${phoneNumber}'` , (err,result)=>{
//     // user_id
//     if(!err){
//         if(result.rows.length === 1){
//             const user_id = result.rows[0].user_id
//                ( '${user_id}','${reserve_code}','${item.maleCount}', '${item.femaleCount}', '${item.text}')
//                        res.json( { status:200, message:'reserved' , reserve_code:reserve_code})

          
           
//         }   
//          //user not found
//         else if (result.rows.length === 0){
//             client.query(`insert into users  (phone_number, first_name, last_name )
//              values ('${phoneNumber}', '${firstName}', '${lastName}' )` ,(err1,result1)=>{
//                 if(!err1){
//                     client.query(`select user_id from users where phone_number ='${phoneNumber}'` , 
//                     (err2,result2)=>{
//                         // user_id
//                         if(!err2){
//                             const user_id = result2.rows[0].user_id
//                             days.forEach(item=>{
//                             const reserve_code = bcrypt.hashSync(`"user_id":"${user_id}",${JSON.stringify(item)}`, salt);
//                                 client.query(`insert into reserves
//                                 (user_id, reserve_code, male_count, female_count, _day ) 
//                                values
//                                 ( '${user_id}','${reserve_code}','${item.maleCount}', '${item.femaleCount}', '${item.text}')
                            
//                                 `,(err3,result3)=>{
//                                    if(err3){
//                                         console.log('error',err3)
//                                    }else{
//                                     console.log('result3',result3)                                           }
//                                })
//                             }) 
//                         }else{
//                         //error
                            
//                         }
//                     })
//                 }else{
//                   console.log(err)
//                }
//               })
//             res.json( { status:400, message:'user not found'})
//         }else{
//             //not possible ever never
//             res.json( { status:400, message:'duplicate'})
//         }
//     }else{
//     //error
//         res.json( { status:400, message:err})
//     }
// })


