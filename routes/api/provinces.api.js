const express = require('express');
const router = express.Router();
const tinhThanhService = require('../../services/tinhthanh.service')

router.get('/provinces', async (req, res, next) => {
    try{
        const tinhthanh = await tinhThanhService.getAll()
        res.json(tinhthanh)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/provinces/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const tinhThanh = await tinhThanhService.getTinhThanhById(id)
        res.json(tinhThanh)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;