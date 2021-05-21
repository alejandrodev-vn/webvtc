const CTSCaNhanService = require('../services/ctscanhan.service')
const {validationResult} = require('express-validator');

module.exports.addCTSCaNhan = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let values = req.body;

        await CTSCaNhanService.createNewCTSCaNhan(values);
        res.redirect('/ctscanhan')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.editCTSCaNhan = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params
        let values = req.body;

        await CTSCaNhanService.updateCTSCaNhan(id, values);
        res.redirect('/ctscanhan')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.deleteCTSCaNhan = async (req, res, next) => {
    try{
        const { id } = req.params

        await CTSCaNhanService.deleteCTSCaNhanById(id);
        res.redirect('/ctscanhan')
    }
    catch(err){
        console.log(err)
    }
}