const express = require('express')
const router= express.Router({mergeParams:true})

router.use('/add-user',require('./add-user'))
router.use('/check-username', require('./check-username-user'))

module.exports = router
 
