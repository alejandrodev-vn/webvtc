const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        let auth = req.headers.authorization
        let token = auth.split(' ')[1]
        if(!token){
            console.log('Token not found')
            res.json({success:false, msg:'Unauthorized'})
        }else{
            jwt.verify(token, process.env.KEY, (err, decode)=>{
                if(!err){
                    req.data = decode
                    next()
                }else{
                    res.json({success:false, msg:'Unauthorized'})
                }
            })
          
        }
    }catch(err){
        console.log('Token verify failed')
        res.json({success:false, msg:'Unauthorized'})
    }
}