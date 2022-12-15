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
    const { days, firstName,lastName, phoneNumber, id } = req.body;
    const user ={ phone_number:phoneNumber, first_name:firstName, last_name:lastName}
    if (!req.body.phoneNumber) {
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }
    User.update(user,{where:{phone_number:phoneNumber}})
      .then(result=>{console.log(' success update user')})
      .catch(()=>{console.log('error creating user')})
    const d = days.map(item=>{return item.text})
    Reserve.destroy({ where: { user_id:id , day: d }})
    Reserve.findAll({where:{user_id:id}}).then(()=>{
      const reserve = days.map(item=>{
        return {
          user_id:id,
          male_count:item.maleCount,
          female_count:item.female_count,
          day:item.text,
      }
      })
      Reserve.bulkCreate(
        reserve,
        { updateOnDuplicate: ['user_id','male_count','female_count','day','reserve_code']}
        ).then((test) => {
          console.log('test',test)
          Reserve.findAll({where:{user_id:id}}).then(data=>{
            res.send({message:'reserved',data:data,status:200})
          })
        }).catch((err)=>{
          console.log(err)
          res.send({message:'reserved failed',data:err,status:202})
        })
    }).catch(()=>{
    //console.log('there is no reserve record for this user should create')
    try{
      const reserve=days.map(item=>{
        return{
            user_id:id,
            male_count:item.maleCount,
            female_count:item.female_count,
            day:item.text,
        }})
      Reserve.bulkCreate(
        reserve,
        { updateOnDuplicate: ['user_id','male_count','female_count','day','reserve_code']}
        ).then((test) => {
          console.log('test',test)
          Reserve.findAll({where:{user_id:id}}).then(data=>{
            console.log('dataaaaaaaaaaaaaaaaaaaaaaa',data)
            res.send({message:'reserved',data:data,status:200})
          })
        }).catch((err)=>{
          console.log(err)
          res.send({message:'reserved failed',status:202})
        })
  }
  catch(error){
    console.log(error)
  }
      })  
})
module.exports =  router
 