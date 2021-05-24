const { log } = require('debug');
const usersModel = require('../models/users.model')

exports.getAll = async () => {
    try{
        const users = await usersModel.find({});
        return users
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const user = await usersModel.findById(id);
        return user
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const hoTen = values.hoTen
        const email = values.email
        const username = values.username
        const password = values.password
        const soDienThoai = values.soDienThoai
        const gender = values.gender
        const avatar = values.avatar
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newUser = new usersModel({
                hoTen,
                email,
                username,
                password:passwordHashed,
                soDienThoai,
                gender,
                avatar,
        })
        return newUser.save((err) => {
            if(err){
                console.log('Add user fail!');
            }else{
                console.log('Add user success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async (id, inputValues) => {
    const hoTen = inputValues.hoTen
    const email = inputValues.email
    const soDienThoai = inputValues.soDienThoai
    const gender = inputValues.gender
    const avatar = inputValues.avatar

    const values = { hoTen, email, soDienThoai, gender, avatar }
    
    return await usersModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
module.exports.changePassword = async (id, inputValues) =>{
    const bcrypt = require("bcrypt");      
    var salt = bcrypt.genSaltSync(10);
    const password = inputValues.password;

    const passwordHashed = bcrypt.hashSync(password, salt);

    const newPassword = passwordHashed 

    return await usersModel.findByIdAndUpdate({_id:id}, {password: newPassword}, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
