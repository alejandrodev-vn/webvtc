const express = require('express');
const router = express.Router();
const CTSCaNhanService = require('../../services/ctscanhan.service')
const usersService = require('../../services/users.service')
const findService = require('../../services/find.service')
router.get('/digital-certificate/personal', async (req, res, next) => {
    try{
        const CTSCaNhan = await CTSCaNhanService.getAll()
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal-pending', async (req, res, next) => {
    try{
        const CTSCaNhan = await CTSCaNhanService.getAllPending()
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/admin/digital-certificate/personal', async (req, res, next) => {
    try{
        const CTSCaNhan = await CTSCaNhanService.getForAdmin1()
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/admin/digital-certificate/personal-approved', async (req, res, next) => {
    try{
        const CTSCaNhan = await CTSCaNhanService.getApprovedForAdmin1()
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
//self
router.get('/digital-certificate/personal/getPendingByUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSCaNhan = await CTSCaNhanService.getPendingByUserId(userId)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/getFindByUserId', async (req, res, next)=> {
    try{
        const CTSCaNhan = await findService.getFindByUserId()
        console.log(CTSCaNhan)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/getApprovedByUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSCaNhan = await CTSCaNhanService.getApprovedByUserId(userId)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
//admin2
router.get('/digital-certificate/personal/byAgency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        //daily1
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getPendingByUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                if(CTSCaNhan[0].trangThai==1 || CTSCaNhan[0].trangThai==4){
                    result.push(...CTSCaNhan)

                }
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    if(cts.trangThai==1 || cts.trangThai==4){
                        result.push(cts)
                    }
                })
            }
        }
        //daily2
        for(let i=0; i<agencyList.length; i++){
            let agency2 = await usersService.getByBelongTo(agencyList[i]._id)
            agency2.forEach( async agency => {
                let CTSCaNhan = await CTSCaNhanService.getPendingByUserId(agency._id)
                if(CTSCaNhan.length==1){
                    if(CTSCaNhan[0].trangThai==1 || CTSCaNhan[0].trangThai==4){
                        result.push(...CTSCaNhan)
    
                    }
                }else if(CTSCaNhan.length!=0){
                    CTSCaNhan.map(cts=>{
                        if(cts.trangThai==1 || cts.trangThai==4){
                            result.push(cts)
                        }
                    })
                }
            })

        }
        res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/approved-by-agency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        //daily1
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getApprovedByUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                if(CTSCaNhan[0].trangThai==5 || CTSCaNhan[0].trangThai==6){
                    result.push(...CTSCaNhan)

                }
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    if(cts.trangThai==5 || cts.trangThai==6){
                        result.push(cts)
                    }
                })
            }
        }
        //daily2
        for(let i=0; i<agencyList.length; i++){
            let agency2 = await usersService.getByBelongTo(agencyList[i]._id)
            agency2.forEach( async agency => {
                let CTSCaNhan = await CTSCaNhanService.getApprovedByUserId(agency._id)
                if(CTSCaNhan.length==1){
                    if(CTSCaNhan[0].trangThai==5 || CTSCaNhan[0].trangThai==6){
                        result.push(...CTSCaNhan)
    
                    }
                }else if(CTSCaNhan.length!=0){
                    CTSCaNhan.map(cts=>{
                        if(cts.trangThai==5 || cts.trangThai==6){
                            result.push(cts)
                        }
                    })
                }
            })

        }
        res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
//daily1
router.get('/digital-certificate/personal/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getPendingByUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                if(CTSCaNhan[0].trangThai==1 || CTSCaNhan[0].trangThai==2 
                    || CTSCaNhan[0].trangThai==3 || CTSCaNhan[0].trangThai==4){
                    result.push(...CTSCaNhan)
                }
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    if(cts.trangThai==1 || cts.trangThai==2 
                        || cts.trangThai==3 || cts.trangThai==4){
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
router.get('/digital-certificate/personal/approved-agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await CTSCaNhanService.getApprovedByUserId(agencyList[i]._id)
            console.log(CTSCaNhan)
            if(CTSCaNhan.length==1){
                if(CTSCaNhan[0].trangThai==5 || CTSCaNhan[0].trangThai==6){
                    result.push(...CTSCaNhan)
                }
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    if(cts.trangThai==5 || cts.trangThai==6){
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