const tinhThanhService = require('../services/provinces.service');


module.exports.add = async (req, res, next) => {
    try{
        let { name } = req.body;
        await tinhThanhService.createNew(name);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await tinhThanhService.update(id, values);
        res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await tinhThanhService.delete(id);
        res.redirect('/provinces')
    } catch (err) {
        console.log(err)
    }
 
}