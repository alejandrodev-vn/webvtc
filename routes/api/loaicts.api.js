const express = require('express');
const router = express.Router();
const loaiCTSService = require('../../services/loaicts.service')

router.get('/type', async (req, res, next) => {
    try{
        const loaiCTS = await loaiCTSService.getAll()
        res.json(loaiCTS)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/type/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const loaiCTS = await loaiCTSService.getById(id)
        res.json(loaiCTS)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;