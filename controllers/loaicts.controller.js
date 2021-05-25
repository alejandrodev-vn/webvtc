const loaiCTSService = require('../services/loaicts.service');


module.exports.add = async (req, res, next) => {
    try{
        let { name } = req.body;
        await loaiCTSService.createNew(name);
        res.redirect('/type')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await loaiCTSService.update(id, values);
        res.redirect('/type')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await loaiCTSService.delete(id);
        res.redirect('/type')
    } catch (err) {
        console.log(err)
    }
 
}