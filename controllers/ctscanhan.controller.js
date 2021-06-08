const goiDichVuService = require('../services/goidichvu.service')
const CTSCaNhanService = require('../services/ctscanhan.service')
const {validationResult} = require('express-validator');

module.exports.personal = (req, res, next) => {
    try{
        res.render('personal', { title: 'CTS Cá nhân', errors:req.session.errors });
        req.session.errors = null
    }catch(err){
        console.log(err)
    }
}

module.exports.add = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            return res.redirect('/digital-certificate/personal')
        }
        let values = req.body;
        const goiDichVu = await goiDichVuService.getById(values.goiCTSId)
        const getGia = goiDichVu.gia
        values.goiCTSId = goiDichVu._id
        values.thoiHan = goiDichVu.thoiHan
        values.gia =Number(getGia)
        values.ngayTao = convertToYYYYMMDD(Date.now())
        await CTSCaNhanService.createNew(values);
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.update = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { idEdit } = req.body
        let values = req.body;

        await CTSCaNhanService.update(idEdit, values);
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendRequest = async (req, res, next) => {
    try{
        let { selectItem } = req.body;
        if(Array.isArray(selectItem)){
            for(let i=0; i<selectItem.length; i++){
                await CTSCaNhanService.sendRequest(selectItem[i], {trangThai: 1});
            }
        }else {
            await CTSCaNhanService.sendRequest(selectItem, {trangThai: 1});
        }
        
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendResponse = async (req, res, next) => {
    try{
        const { id, accept, decline } = req.body
        if(accept == 'Duyệt' && accept != 'undefined'){
            await CTSCaNhanService.sendResponse(id, {trangThai: 2});
            res.redirect('/')
        }else if(decline == 'Từ Chối Duyệt' && decline != 'undefined'){
            await CTSCaNhanService.sendResponse(id, {trangThai: 0});
            res.redirect('/')
        }else{
            res.redirect('/')
        }
     
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendMail = async (req, res, next) => {
    try{
        const user = req.body
        const mailgun = require("mailgun-js");
        const DOMAIN = "sandbox7f9e883d109046e38f8d3a0a182518eb.mailgun.org";
        const mg = mailgun({apiKey: "7f6264d76c3462ed20e7f5a6fe29ffbf-1d8af1f4-c381556f", domain: DOMAIN});
        const data = {
            from: "SmartSign <huytra264@gmail.com>",
            to: "huytra264@gmail.com",
            subject: "Xác nhận thông tin SmartSign",
            text: `Kính gửi Ông/Bà ${user.username}`
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    }catch(err){
        console.log(err)
    }
}
module.exports.handleFormActions = async (req, res, next) => {
    try{
        let { selectItem, deletePersonal, sendPersonal } = req.body;
        if(deletePersonal == 'Xóa' && deletePersonal != 'undefined'){
            if(Array.isArray(selectItem)){
                for(let i=0; i<selectItem.length; i++){
                    await CTSCaNhanService.delete(selectItem[i]);
                }
            }else {
                await CTSCaNhanService.delete(selectItem);
            }
        }else if(sendPersonal != 'undefined'){ 
            if(Array.isArray(selectItem)){
                for(let i=0; i<selectItem.length; i++){
                    await CTSCaNhanService.sendRequest(selectItem[i], {trangThai: 1});
                }
            }else {
                await CTSCaNhanService.sendRequest(selectItem, {trangThai: 1});
            }
        }else{
            res.redirect('/')
        }
        
        
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendMail =  async (req, res, next) => {
    const { id } = req.params 
    const cts = await CTSCaNhanService.getById({_id:id})
    const nodemailer = require('nodemailer')
    const jwt = require('jsonwebtoken')
    let token = jwt.sign({ username: cts.soDienThoai }, process.env.KEY,{
        expiresIn: '1m' /*<---- this is 1 minutes ♥*/
    }, (err, token) => {
        if (err) {
            console.log('Token sign failed');
        }else{
            var transporter =  nodemailer.createTransport({ // config mail server
                service:"gmail",
                auth: {
                    user: 'huytrafpt@gmail.com',
                    pass: 'Huytra264'
                },
                tls: {rejectUnauthorized:false}
        
            });
            var mainOptions = { 
                from: 'SmartSign<smartsign@gmail.com>',
                to: cts.email,
                subject: `Kính gửi Ông/Bà ${cts.hoTenNguoiDK}.`,
                text: `SmartSign trân trọng cám ơn quý khách hàng đã tin tưởng sử dụng dịch vụ của công ty chúng tôi.
                - Thông tin thuê bao như sau:
                    + Họ tên người đăng ký: ${cts.hoTenNguoiDK}
                    + Mã số thuế: ${cts.MSTCaNhan}
                    + CMND/HC: ${cts.soCMT}
                    + Điện thoại: ${cts.soDienThoai}
                `,
                html: `<h2>Quý khách hàng vui lòng truy cập đường link để xác nhận thông tin:</h2>
                <a href="http://localhost:3000/${token}">http://localhost:3000/${token}</a>
                `
            }
            
            transporter.sendMail(mainOptions, async function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log('Message sent: ' +  info.response);
                    if(cts.trangThai == 2){ 
                        await 
                        CTSCaNhanService.update(id, { trangThai:3 }) 
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