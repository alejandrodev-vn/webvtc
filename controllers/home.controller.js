const User = require('../models/users.model')
const LoaiCTS = require('../models/loaicts.model')
const CTSCaNhan = require('../models/ctscanhan.model')
const CTSDoanhNghiep = require('../models/ctsdoanhnghiep.model')
const CTS = require('../models/cts.model')
const GiaoDich = require('../models/giaodich.model')
const GoiDichVu = require('../models/goidichvu.model')
const TinhThanh = require('../models/tinhThanh.model')
const QuanHuyen = require('../models/quanHuyen.model')
const tinhThanhService = require('../services/tinhthanh.service');

module.exports.index = (req, res, next)=> {

    res.send('Hello')
}
module.exports.getUsers = async (req, res, next)=> {
    try{
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
module.exports.getTinhThanh = async (req, res, next)=> {
    try{
        const tinhthanh = await tinhThanhService.getAll()
        console.log(tinhthanh)
    }   
    catch(err){
        console.log(err)
    }
}

module.exports.addTinhThanh = (req, res, next) => {
    let {name} = req.body;
    tinhThanhService.addTinhThanh(name);
}

module.exports.deleteTinhThanh = (req, res, next) => {
    let {id} = req.body;
    tinhThanhService.deleteTinhThanhById(id);
}