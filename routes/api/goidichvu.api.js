const express = require('express');
const router = express.Router();
const goiDichVuService = require('../../services/goidichvu.service')

router.get('/services', async (req, res, next) => {
    try{
        const goiDichVu = await goiDichVuService.getAll()
        res.json(goiDichVu)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/services/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const goiDichVu = await goiDichVuService.getById(id)
        res.json(goiDichVu)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;