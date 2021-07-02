const express = require('express');
const router = express.Router();
const tinhThanhService = require('../../services/provinces.service')

router.get('/provinces', async (req, res, next) => {
    try{
        const tinhthanh = await tinhThanhService.getAll()
        return res.json(tinhthanh)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/provinces/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const tinhThanh = await tinhThanhService.getById(id)
        return res.json(tinhThanh)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;