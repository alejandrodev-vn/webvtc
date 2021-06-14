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
module.exports.add = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errorsDN = errors.array()
            return res.redirect('/digital-certificate/organization')
        }
        let values = req.body;
        const goiDichVu = await goiDichVuService.getById(values.goiCTSId)
        const getGia = goiDichVu.gia
        values.goiCTSId = goiDichVu._id
        values.thoiHan = goiDichVu.thoiHan
        values.giaCuoc =Number(getGia)
        values.fileHoSo = req.file.originalname
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
        const { idEdit } = req.body
        let values = req.body;

        await CTSDoanhNghiepService.update(idEdit, values);
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
}


module.exports.handleFormActions = async (req, res, next) => {
    try{
        let { selectItem1, deleteOrganization, sendOrganization } = req.body;
        if(deleteOrganization == 'Xóa' && deleteOrganization != 'undefined'){
            if(Array.isArray(selectItem1)){
                for(let i=0; i<selectItem1.length; i++){
                    await CTSDoanhNghiepService.delete(selectItem1[i]);
                }
            }else {
                await CTSDoanhNghiepService.delete(selectItem1);
            }
            res.redirect('/')
        }else if(sendOrganization != 'undefined'){ 
            if(Array.isArray(selectItem1)){
                for(let i=0; i<selectItem1.length; i++){
                    await CTSDoanhNghiepService.sendRequest(selectItem1[i], {trangThai: 1});
                }
            }else {
                await CTSDoanhNghiepService.sendRequest(selectItem1, {trangThai: 1});
            }
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

module.exports.sendMail =  async (req, res, next) => {
    const { id } = req.params 
    const cts = await CTSDoanhNghiepService.getById({_id:id})
    const nodemailer = require('nodemailer')
    const jwt = require('jsonwebtoken')
    let token = jwt.sign({ soDienThoai: cts.soDienThoaiCongTy, idCer: cts._id }, process.env.KEY,{
        expiresIn: '5m' /*<---- this is 5 minutes ♥*/
    }, (err, token) => {
        if (err) {
            console.log('Token sign failed');
        }else{
            var transporter =  nodemailer.createTransport({ // config mail server
                service:"gmail",
                auth: {
                    user: 'namdtps12220@fpt.edu.vn',
                    pass: 'nam180201'
                },
                tls: {rejectUnauthorized:false}
        
            });
            var mainOptions = { 
                from: 'SmartSign<smartsign@gmail.com>',
                to: cts.emailGD,
                subject: `Kính gửi Doanh nghiệp/ Tổ chức: ${cts.tenGD}.`,
                text: `SmartSign trân trọng cám ơn quý khách hàng đã tin tưởng sử dụng dịch vụ của công ty chúng tôi.
                - Thông tin thuê bao như sau:
                    + Doanh nghiệp/ Tổ chức: ${cts.tenGD}
                    + Mã số thuế: ${cts.MST}
                    + Giấy phép ĐKKD: ${cts.giayPhepDKKD}
                    + Điện thoại: ${cts.soDienThoaiCongTy}
                `,
                html: `<h2>Quý khách hàng vui lòng truy cập đường link để xác nhận thông tin:</h2>
                <a href="http://localhost:3000/digital-certificate/organization/get-otp/${token}">
                http://localhost:3000/digital-certificate/organization/get-otp/${token}
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
                        await 
                        CTSDoanhNghiepService.update(id, { trangThai:3 }) 
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