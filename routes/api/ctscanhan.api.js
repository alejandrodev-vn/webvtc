const express = require('express');
const router = express.Router();
const CTSCaNhanService = require('../../services/ctscanhan.service')
const usersService = require('../../services/users.service')

router.get('/digital-certificate/personal', async (req, res, next) => {
    try{
        const CTSCaNhan = await CTSCaNhanService.getAll()
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/byUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSCaNhan = await CTSCaNhanService.getByUserId(userId)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/byAgency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getByUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                if(CTSCaNhan[0].trangThai==1 || CTSCaNhan[0].trangThai==3){
                    result.push(...CTSCaNhan)

                }
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    if(cts.trangThai==1 || cts.trangThai==3){
                        result.push(cts)
                    }
                })
            }
        }
        res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getByUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                result.push(...CTSCaNhan)
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    result.push(cts)
                })
            }
        }
        res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const CTSCaNhan = await CTSCaNhanService.getById(id)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;