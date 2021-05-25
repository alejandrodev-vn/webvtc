const tinhThanhService = require('../services/provinces.service')
const CTSCaNhanService = require('../services/ctscanhan.service')
const {validationResult} = require('express-validator');
const url = "http://localhost:3000/"
module.exports.personal = async (req, res, next) => {
    try{
        res.render('personal', { title: 'CTS Cá nhân' });
    }catch(err){
        console.log(err)
    }
}
module.exports.add = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let values = req.body;
        console.log(req.body)
        await CTSCaNhanService.createNew(values);
        res.redirect('/digital-certificate/personal')
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