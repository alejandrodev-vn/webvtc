const usersService = require('../services/users.service');

module.exports.signup = (req, res, next)=> {
    res.render('signup')
    
}


module.exports.add = async (req, res, next)=> {
    try{
       let values = req.body
       await usersService.createNew(values)
       res.status(200).redirect('/users')
    }
    catch(err){
        console.log(err)
    }
}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await usersService.update(id, values);
        res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.changePassword = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await usersService.changePassword(id, values);
        res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.login = async (req, res, next) => {
    try{
        let values = req.body;
        
        const user = await usersService.login(values);
        if(user.error === 'User not found'){
            res.status(404).json(user.error)
        }else if(user.error === 'Password error !!!'){
            res.status(401).json(user.error)
        }else{
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({ username: user.username }, process.env.KEY,{
                expiresIn: '600s' /*<---- this is 10 minutes ♥*/
            }, (err, token) => {
                if (err) {
                    console.log('Token sign failed');
                }else{
                    req.session.token = token
                    res.redirect('/')  
                }
            }) 
        }
    }
    catch(err){
        console.log(err)
    }
}
