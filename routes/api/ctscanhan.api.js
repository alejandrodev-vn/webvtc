const express = require('express');
const router = express.Router();
const CTSCaNhanService = require('../../services/ctscanhan.service')

router.get('/digital-certificate/personal', async (req, res, next) => {
    try{
        const ctscanhan = await CTSCaNhanService.getAll()
        res.json(ctscanhan)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/digital-certificate/personal/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const ctscanhan = await CTSCaNhanService.getById(id)
        res.json(ctscanhan)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;