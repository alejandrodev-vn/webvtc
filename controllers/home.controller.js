const User = require('../models/users.model')
const LoaiCTS = require('../models/loaicts.model')
const CTSCaNhan = require('../models/ctscanhan.model')
const CTSDoanhNghiep = require('../models/ctsdoanhnghiep.model')
const CTS = require('../models/cts.model')
const GiaoDich = require('../models/giaodich.model')
const GoiDichVu = require('../models/goidichvu.model')
const tinhThanhService = require('../services/tinhthanh.service');
const TinhThanh = require('../models/provinces.model')
const QuanHuyen = require('../models/districts.model')
module.exports.index = (req, res, next)=> {

    res.send('Hello')
}
// module.exports.getUsers = async (req, res, next)=> {
//     try{
//         const users = await User.find({})
//         console.log(users)
//     }   
//     catch(err){
//         console.log(err)
//     }
// }
// module.exports.postUsers = async (req, res, next)=> {
//     try{
//         const bcrypt = require("bcrypt");      
//         var salt = bcrypt.genSaltSync(10);
//         const hoTen = req.body.hoTen
//         const email = req.body.email
//         const username = req.body.username
//         const password = req.body.password
//         const soDienThoai = req.body.soDienThoai
//         const gender = req.body.gender
    
//         const passwordHashed = bcrypt.hashSync(password, salt);
//         try{
//             let newUser = new User({
//                 hoTen,
//                 email,
//                 username,
//                 password:passwordHashed,
//                 soDienThoai,
//                 gender,
//                 avatar:'avatar',
//             })
//             await newUser.save();
//         }
//         catch(err){
//             console.log(err)
//         }
//        res.status(200).redirect('/users')
//     }
//     catch(err){
//         console.log(err)
//     }
// }
module.exports.getAllTinhThanh = async (req, res, next)=> {
    try{
        const tinhthanh = await tinhThanhService.getAll()
        res.json(tinhthanh)
    }   
    catch(err){
        console.log(err)
    }
}
module.exports.getTinhThanhById = async (req, res, next)=> {
    try{
        const id = req.params.id
        const tinhThanh = await tinhThanhService.getTinhThanhById(id)
        res.json(tinhThanh)
    }   
    catch(err){
        console.log(err)
    }
}
module.exports.addTinhThanh = async (req, res, next) => {
    try{
        let { name } = req.body;
        await tinhThanhService.addTinhThanh(name);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.updateTinhThanh = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
        await tinhThanhService.updateTinhThanhById(id, values);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.deleteTinhThanh = async (req, res, next) => {
    try {
        const id = req.params.id;
        await tinhThanhService.deleteTinhThanhById(id);
        res.redirect('/provinces')
    } catch (err) {
        console.log(err)
    }
 
}