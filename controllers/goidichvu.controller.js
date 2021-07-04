const goiDichVuService = require('../services/goidichvu.service');
module.exports.getAll = async (req, res, next) => {
    try{
        const services = await goiDichVuService.getAll()
        res.render('manage-services',{ services,message:null })
    }
    catch(err){
        console.log(err)
    }

}
module.exports.add = async (req, res, next) => {
    try{
        let { tenGoiDichVu, gia, thoiHan } = req.body;
        await goiDichVuService.createNew(tenGoiDichVu, gia, thoiHan);
        res.redirect('/services')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.update = async (req, res, next) => {
    try{
        const {id} = req.body;
        let values = req.body;
       
        await goiDichVuService.update(id, values);
        res.redirect('/services')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await goiDichVuService.delete(id);
        res.redirect('/services')
    } catch (err) {
        console.log(err)
    }
 
}