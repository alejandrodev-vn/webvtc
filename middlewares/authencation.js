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
module.exports.checkAdmin1 = function(req, res, next){
    try{
        let { token } = req.session;
        let { role } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                if(role==0){
                    next()
                }else{
                    res.redirect('/users/login')
                }
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
module.exports.checkAdmin2 = function(req, res, next){
    try{
        let { token } = req.session;
        let { role } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                if(role==1){
                    next()
                }else{
                    res.redirect('/users/login')
                }
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
module.exports.checkAgency1 = function(req, res, next){
    try{
        let { token } = req.session;
        let { role } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                if(role==2){
                    next()
                }else{
                    res.redirect('/users/login')
                }
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
module.exports.checkAgency2 = function(req, res, next){
    try{
        let { token } = req.session;
        let { role } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                if(role==3){
                    next()
                }else{
                    res.redirect('/users/login')
                }
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
module.exports.checkIsAdmin = function(req, res, next){
    try{
        let { token } = req.session;
        let { role } = req.session;
        if(token){
            const check = jwt.verify(token, process.env.KEY)
            if(check){
                if(role==0 || role == 1){
                    next()
                }else{
                    res.redirect('/users/login')
                }
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