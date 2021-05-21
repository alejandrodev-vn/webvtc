const tinhThanhService = require('../services/tinhthanh.service');


module.exports.addTinhThanh = async (req, res, next) => {
    try{
        let { name } = req.body;
        await tinhThanhService.addTinhThanh(name);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.updateTinhThanh = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await tinhThanhService.updateTinhThanhById(id, values);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.deleteTinhThanh = async (req, res, next) => {
    try {
        const id = req.params.id;
        await tinhThanhService.deleteTinhThanhById(id);
        res.redirect('/provinces')
    } catch (err) {
        console.log(err)
    }
 
}