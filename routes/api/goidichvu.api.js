const express = require('express');
const router = express.Router();
const goidichvuService = require('../../services/goidichvu.service')

router.get('/goidichvu', async (req, res, next) => {
    try{
        const goidichvu = await goidichvuService.getAll()
        res.json(goidichvu)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/goidichvu/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const goidichvu = await goidichvuService.getgoidichvuById(id)
        res.json(goidichvu)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;