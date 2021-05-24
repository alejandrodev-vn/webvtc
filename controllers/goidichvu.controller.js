// const GoiDichVu = require('../models/goidichvu.model')
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
module.exports.updategoidichvu = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await goidichvuService.updategoidichvuById(id, values);
        res.redirect('/goidichvu')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.deletegoidichvu = async (req, res, next) => {
    try {
        const id = req.params.id;
        await goidichvuService.deletegoidichvuById(id);
        res.redirect('/goidichvu')
    } catch (err) {
        console.log(err)
    }
 
}