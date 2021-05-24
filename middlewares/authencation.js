const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        let { token } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                next()
            }else {
                console.log('Token verify failed')
                res.redirect('/users/login')
            }
        }else{
            console.log('Token not found')
            res.redirect('/users/login')
        }
    }catch(err){
        console.log('Token verify failed')
        res.redirect('/users/login')
    }
}