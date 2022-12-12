const { DataTypes, where } = require('sequelize')
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
    const { days, firstName,lastName, phoneNumber, } = req.body;
    //QC should validate more clearly
    if (!req.body.phoneNumber) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const user ={ phone_number:phoneNumber,first_name:firstName, last_name:lastName}
      User.update(user,{where:{phone_number:phoneNumber}})
      .then(result=>{console.log(' success update user')})
      .catch(()=>{console.log('error creating user')})
      User.findAll({where:{phone_number:phoneNumber}}).then(data=>{
        const reserve=days.map(item=>{
          return{
            user_id:data[0].user_id,
            male_count:item.maleCount,
            female_count:item.female_count,
            day:item.text,
        }
        })
        try{
            Reserve.bulkCreate(
              reserve,
             { updateOnDuplicate: ["createdAt","updatedAt"]}
              ).then(() => {
                Reserve.findAll({where:{user_id:data[0].user_id}}).then(data=>{
                  res.send({message:'reserved',data:data,status:200})
                })
              }).catch((err)=>{
                res.send({message:'reserved failed',data:data,status:202})
              })
              
              
            
       }
        catch(error){
          console.log(error)
        }
      })  
    })
  
module.exports =  router
 