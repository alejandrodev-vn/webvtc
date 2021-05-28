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
        const diaChi = values.diaChi
        const tinhThanhId = values.tinhThanhId
        const role = values.role
        const tenDaiLy = values.tenDaiLy
        const belongTo = values.belongTo
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newUser = new usersModel({
                hoTen,
                email,
                username,
                password:passwordHashed,
                soDienThoai,
                diaChi,
                tinhThanhId,
                role,
                tenDaiLy,
                belongTo
        })
        return newUser.save((err) => {
            if(err){
                console.log(err)
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
module.exports.login = async (values) =>{
    try{
        const { username ,password } = values
        const user = await usersModel.findOne({username:username})
        if(!user){
            return {success: false, error:'User not found'}
        }else {
            const bcrypt = require("bcrypt");        
            const password_db = user.password
            const passwordCompared = bcrypt.compareSync(password, password_db)
            if(!passwordCompared){
                return {success: false, error:'Password error !!!'}
            }else {
                return user
            }
        }
    }catch(err){
        console.log(err)
    }
}
