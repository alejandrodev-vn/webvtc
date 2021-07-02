const express = require('express');
const router = express.Router();
const districtsService = require('../../services/districts.service')

router.get('/districts', async (req, res, next) => {
    try{
        const districts = await districtsService.getAll()
        return res.json(districts)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/districts/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const districts = await districtsService.getById(id)
        return res.json(districts)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;