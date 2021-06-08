const goiDichVuService = require('../services/goidichvu.service')
const CTSDoanhNghiepService = require('../services/ctsdoanhnghiep.service')
const {validationResult} = require('express-validator');


module.exports.organization = (req, res, next) => {
    try{
        res.render('organization', { title: 'CTS Doanh nghiep', errorsDN:req.session.errorsDN });
        req.session.errorsDN = null
    }catch(err){
        console.log(err)
    }
}
module.exports.adds = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errorsDN = errors.array()
            return res.redirect('/digital-certificate/organization')
        }
        console.log(req.body)
        let values = req.body;
        const goiDichVu = await goiDichVuService.getById(values.goiCTSId)
        const getGia = goiDichVu.gia
        values.goiCTSId = goiDichVu._id
        values.thoiHan = goiDichVu.thoiHan
        values.giaCuoc =Number(getGia)
        values.ngayTao = convertToYYYYMMDD(Date.now())
        await CTSDoanhNghiepService.createNew(values);
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
        const { id } = req.params
        let values = req.body;

        await CTSDoanhNghiepService.update(id, values);
        res.redirect('/digital-certificate/organization')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendRequest = async (req, res, next) => {
    try{
        let { selectItem1 } = req.body;
        console.log(selectItem1)
        if(Array.isArray(selectItem1)){
            for(let i=0; i<selectItem1.length; i++){
                await CTSDoanhNghiepService.sendRequest(selectItem1[i], {trangThai: 1});
            }
        }else {
            await CTSDoanhNghiepService.sendRequest(selectItem1, {trangThai: 1});
        }
        
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.sendResponse = async (req, res, next) => {
    try{
        const { idOrg, acceptOrg, declineOrg } = req.body
        if(acceptOrg == 'Duyệt' && acceptOrg != 'undefined'){
            await CTSDoanhNghiepService.sendResponse(idOrg, {trangThai: 2});
            res.redirect('/')
        }else if(declineOrg == 'Từ Chối Duyệt' && declineOrg != 'undefined'){
            await CTSDoanhNghiepService.sendResponse(idOrg, {trangThai: 0});
            res.redirect('/')
        }else{
            res.redirect('/')
        }
     
    }
    catch(err){
        console.log(err)
    }
}
module.exports.delete = async (req, res, next) => {
    try{
        const { id } = req.params

        await CTSDoanhNghiepService.delete(id);
        res.redirect('/digital-certificate/organization')
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

module.exports.sendMail =  async (req, res, next) => {
    const { id } = req.params 
    const cts = await CTSCaNhanService.getById({_id:id})
    const nodemailer = require('nodemailer')
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
        <a href="http://localhost:3000/">http://localhost:3000/</a>
        `
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
  
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