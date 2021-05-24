const districtsService = require('../services/districts.service');


module.exports.add = async (req, res, next) => {
    try{
        let { name , idprovinces } = req.body;
        await districtsService.creatNew(name, idprovinces);
        res.redirect('/districts')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await districtsService.update(id, values);
        res.redirect('/districts')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await districtsService.delete(id);
        res.redirect('/districts')
    } catch (err) {
        console.log(err)
    }
 
}