const usersService = require('../services/users.service');


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
