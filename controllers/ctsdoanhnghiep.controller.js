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