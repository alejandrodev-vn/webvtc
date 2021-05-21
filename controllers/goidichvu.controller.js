const GoiDichVu = require('../models/goidichvu.model')
const goidichvuService = require('../services/goidichvu.service');

module.exports.addgoidichvu = async (req, res, next) => {
    try{
        let { name } = req.body;
        let { gia } = req.body;
        let { time } = req.body;
        await goidichvuService.addgoidichvu(name,gia,time);
        res.redirect('/goidichvu')
    }
    catch(err){
        console.log(err)
    }

}