const express = require('express');
const router = express.Router();
const CTSDoanhNghiepService = require('../../services/ctsdoanhnghiep.service')

router.get('/digital-certificate/company', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getAll()
        res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/digital-certificate/company/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getById(id)
        res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;