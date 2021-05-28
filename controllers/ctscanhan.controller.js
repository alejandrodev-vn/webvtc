const goiDichVuService = require('../services/goidichvu.service')
const CTSCaNhanService = require('../services/ctscanhan.service')
const {validationResult} = require('express-validator');
const url = "http://localhost:3000/"
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
        const goiDichVu = await goiDichVuService.findById(values.goiCTSId)
        values.goiCTSId = goiDichVu._id
        values.thoiHan = goiDichVu.thoiHan
        values.gia =Number(goiDichVu.gia.replace(/[^0-9]/g,''))
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
        const { id } = req.params
        let values = req.body;

        await CTSCaNhanService.update(id, values);
        res.redirect('/digital-certificate/personal')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.delete = async (req, res, next) => {
    try{
        const { id } = req.params

        await CTSCaNhanService.delete(id);
        res.redirect('/digital-certificate/personal')
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