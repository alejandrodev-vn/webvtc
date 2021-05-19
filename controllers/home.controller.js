const User = require('../models/users.model')
module.exports.index = (req, res, next)=> {

    res.send('Hello')
}
module.exports.getUsers = async (req, res, next)=> {
    try{
        const { connection } = require('../database')
        const users = await User.find({})
        console.log(users)
    }   
    catch(err){
        console.log(err)
    }
}
module.exports.postUsers = async (req, res, next)=> {
    try{
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const hoTen = req.body.hoTen
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password
        const soDienThoai = req.body.soDienThoai
        const gender = req.body.gender
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        try{
            let newUser = new User({
                hoTen,
                email,
                username,
                password:passwordHashed,
                soDienThoai,
                gender,
                avatar:'avatar',
            })
            await newUser.save();
        }
        catch(err){
            console.log(err)
        }
       res.status(200).redirect('/users')
    }
    catch(err){
        console.log(err)
    }
}