
const jwt = require('jsonwebtoken');
const authentication = ( req, res , next)=>{
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log('token',token)
    if(token === null) res.sendStatus(401)
    jwt.verify(token,process.env.OTP_SECRET_KEY, function(err, phoneNumber) {
        if(err) return res.sendStatus(403)
        req.phoneNumber = phoneNumber
        next()
        //no access
      });
}

module.exports = authentication
