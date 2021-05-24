const districtsService = require('../services/districts.service');


module.exports.adddistricts = async (req, res, next) => {
    try{
        let { name } = req.body;
        let { idprovinces } = req.body;
        await districtsService.adddistricts(name, idprovinces);
        res.redirect('/districts')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.updatedistricts = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await districtsService.updatedistrictsById(id, values);
        res.redirect('/districts')
    }
    catch(err){
        console.log(err)
    }

}

module.exports.deletedistricts = async (req, res, next) => {
    try {
        const id = req.params.id;
        await districtsService.deletedistrictsById(id);
        res.redirect('/districts')
    } catch (err) {
        console.log(err)
    }
 
}