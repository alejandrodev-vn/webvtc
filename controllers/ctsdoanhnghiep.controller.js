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
        values.giaCuoc =Number(req.body.giaCuoc.replace(/[^0-9]/g,''))
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