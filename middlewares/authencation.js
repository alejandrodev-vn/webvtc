const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    let { token } = req.session;
    if(token){
        jwt.verify(token, process.env.KEY, function(err, decode){
            if(err){
                // res.redirect('login');
                console.log('token verify failed')
            }else{
                console.log(decode.username)
                next();
            }
        })
    }else{
        // res.redirect('login');
        console.log('Token not found :)')
    }
}