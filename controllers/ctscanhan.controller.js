const goiDichVuService = require('../services/goidichvu.service')
const CTSCaNhanService = require('../services/ctscanhan.service')
const {validationResult} = require('express-validator');

module.exports.personal = (req, res, next) => {
    try{
        res.render('personal', { 
            title: 'CTS Cá nhân', 
            errors:[], 
            prevData:{},
            message:null
        });
    }catch(err){
        console.log(err)
    }
}

module.exports.add = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('personal',{ 
                title: 'CTS Cá nhân', 
                errors: errors.array(),
                prevData:req.body,
                message:'Thêm thất bại'
            })
        }
        let values = req.body;
        const goiDichVu = await goiDichVuService.getById(values.goiCTSId)
        const getGia = goiDichVu.gia
        values.goiCTSId = goiDichVu._id
        values.thoiHan = goiDichVu.thoiHan
        values.gia =Number(getGia)
        values.ngayTao = convertToYYYYMMDD(Date.now())
        if(req.file){
            values.fileHoSo = req.file.originalname
        }
        await CTSCaNhanService.createNew(values);
        res.render('personal', {
            title: 'CTS Cá nhân', 
            errors:[], 
            prevData:{},
            message:'Thêm thành công'
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.update = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/')
        }
        const { idEdit } = req.body 
        let values = req.body;
        if(req.file){
            const fs = require('fs')
            const data = await CTSCaNhanService.getById(idEdit)
            if(data.fileHoSo.length!=0){
                const path = `public/uploads/fileHoSo/${data.fileHoSo}`
                if(fs.existsSync(path)){
                    fs.unlinkSync(path)
                }
            }
            values.fileHoSo = req.file.originalname
         
        }
        await CTSCaNhanService.update(idEdit, values);
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.renderConfirm = async (req, res, next) => {
    const {token} = req.params
    return res.render('otp/confirm-personal',{token:token})
}
module.exports.confirm = async (req, res, next) => {
    const { token } = req.params
    const { btnConfirm, btnRefuse } = req.body
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('otp/confirm-personal', {  message: 'Quá thời hạn xác thực' })

        }else{
            if(btnConfirm != 'undefined'){
                await CTSCaNhanService.update(decode.idCer, {trangThai:4,action4:Date.now()});
                return res.redirect('/')
            }else if(btnRefuse != 'undefined'){
                await CTSCaNhanService.update(decode.idCer, {trangThai:9,isRefuse:true,refuse:Date.now(),refuseBy:'Khách hàng từ chối'});
                return res.redirect('/')
            }

        }
    })

}

module.exports.sendResponse = async (req, res, next) => {
    try{
        const { id, accept, decline, yKienDaiLy, yKienVina } = req.body
        const cts = await CTSCaNhanService.getById(id)
        if(accept == 'Duyệt' && accept != undefined){
            if(cts.trangThai==1){
                await CTSCaNhanService.sendResponse(id, {
                    trangThai: 2,isRefuse:false,action2:Date.now(),action2By:`${req.session.username} - ${req.session.hoTen}` 
                });
                return res.redirect('/')
            }else if(cts.trangThai==4){
                await CTSCaNhanService.sendResponse(id, {
                    trangThai: 5,isRefuse:false,action5:Date.now(),action5By:`${req.session.username} - ${req.session.hoTen}` });
                return res.redirect('/')
            }
        }else if(decline == 'Từ Chối Duyệt' && decline != 'undefined'){
            await CTSCaNhanService.sendResponse(id, {
                trangThai: 9, yKienDaiLy, yKienVina,refuse:Date.now(),refuseBy:`${req.session.username} - ${req.session.hoTen}`});
            return res.redirect('/')


        }else{
            return res.redirect('/')

        }
     
    }
    catch(err){
        console.log(err)
    }
}
module.exports.handleFormActions = async (req, res, next) => {
    try{
        let { selectItem, deletePersonal, sendPersonal } = req.body;
        if(deletePersonal != undefined){
            if(Array.isArray(selectItem)){
                for(let i=0; i<selectItem.length; i++){
                    await CTSCaNhanService.delete(selectItem[i]);
                    res.redirect('/')
                }
            }else {
                await CTSCaNhanService.delete(selectItem);
                res.redirect('/')

            }
        }else if(sendPersonal != undefined){ 
            if(Array.isArray(selectItem)){
                for(let i=0; i<selectItem.length; i++){
                    await CTSCaNhanService.sendRequest(selectItem[i], {trangThai: 1,action1:Date.now(),action1By:`${req.session.username} - ${req.session.hoTen}` });
                    res.redirect('/')

                }
            }else {
                await CTSCaNhanService.sendRequest(selectItem, {trangThai: 1,action1:Date.now(),action1By:`${req.session.username} - ${req.session.hoTen}` });
                res.redirect('/')

            }
        }else{
            res.redirect('/')
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendMail =  async (req, res, next) => {
    const { id } = req.params 
    const cts = await CTSCaNhanService.getById(id)
    const nodemailer = require('nodemailer')
    const jwt = require('jsonwebtoken')
    let token = jwt.sign({ soDienThoai: cts.soDienThoai, idCer: cts._id }, process.env.KEY,{
        expiresIn: '30m' /*<---- this is 30 minutes */
    }, (err, token) => {
        if (err) {
            console.log('Token sign failed');
        }else{
            var transporter =  nodemailer.createTransport({ // config mail server
                service:"gmail",
                auth: {
                    user: 'huytrafpt@gmail.com',
                    pass: 'Huytra2642001'
                },
                tls: {rejectUnauthorized:false}
        
            });
            var mainOptions = { 
                from: 'SmartSign<smartsign@gmail.com>',
                to: cts.email,
                subject: `Kính gửi Ông/Bà ${cts.hoTenNguoiDK}.`,
                text: `Xác nhận`,
                html: `<h4>SmartSign trân trọng cám ơn quý khách hàng đã tin tưởng sử dụng dịch vụ của công ty chúng tôi.</h4>
                <h4>- Thông tin thuê bao như sau:</h4>
                    <p>+ Họ tên người đăng ký: ${cts.hoTenNguoiDK}</p> 
                    <p>+ Mã số thuế: ${cts.MSTCaNhan}</p> 
                    <p>+ CMND/HC: ${cts.soCMT}</p>
                    <p>+ Điện thoại: ${cts.soDienThoai}</p>
                <h2>Quý khách hàng vui lòng truy cập đường link để xác nhận thông tin:</h2>
                <a href="http://localhost:3000/digital-certificate/personal/get-otp/${token}">
                http://localhost:3000/digital-certificate/personal/get-otp/${token}
                </a>
                `
            }
            
            transporter.sendMail(mainOptions, async function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log('Message sent: ' +  info.response);
                    if(cts.trangThai == 2){ 
                        await CTSCaNhanService.update(id, { trangThai:3,action3:Date.now(),action3By:`${req.session.username} - ${req.session.hoTen}`  }) 
                    }
                    res.redirect('/');
                }
            });
        }
    }) 
}

function convertToYYYYMMDD (d){
    date = new Date(d);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return (year+'-' + month + '-'+dt);
}