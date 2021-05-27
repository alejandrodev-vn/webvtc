const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        let { token } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                res.redirect('/')
            }else {
                console.log('Token verify failed')
                res.redirect('/users')
            }
        }else{
            console.log('Token not found')
            res.redirect('/users')
        }
    }catch(err){
        console.log('Token verify failed')
        res.redirect('/users')
    }
}
module.exports.checkLogin = function(req, res, next){
    try{
        let { token } = req.session;
        if(!token){
            res.redirect('/users')
        }else next()
    }catch(err){
        console.log(err)
    }
}