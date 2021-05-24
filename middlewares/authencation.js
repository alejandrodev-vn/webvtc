const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        let { token } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            console.log(check)
            if(check){
                next()
            }
        }
    }catch(err){
        console.log('Token verify failed')
        return res.redirect('/')
    }
}