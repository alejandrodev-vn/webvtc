const express = require('express');
const router = express.Router();
const giaoDichService = require('../../services/giaodich.service')

router.get('/giaodich', async (req, res, next) => {
    try{
        const giaoDich = await giaoDichVuService.getAll()
        res.json(giaoDich)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/giaodich/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const giaoDich = await giaoDichService.getById(id)
        res.json(giaoDich)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;