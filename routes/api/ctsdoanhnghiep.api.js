const express = require('express');
const router = express.Router();
const CTSDoanhNghiepService = require('../../services/ctsdoanhnghiep.service')
const usersService = require('../../services/users.service')

router.get('/digital-certificate/organization', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getAll()
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization-pending', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getAllPending()
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/admin/digital-certificate/organization', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getForAdmin1()
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/admin/digital-certificate/organization-approved', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getApprovedForAdmin1()
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
//self
router.get('/digital-certificate/organization/getPendingByUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getPendingByUserId(userId)
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/getApprovedByUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getApprovedByUserId(userId)
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/byAgency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getPendingByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                if(CTSDoanhNghiep[0].trangThai==1 || CTSDoanhNghiep[0].trangThai==4){
                    result.push(...CTSDoanhNghiep)
                }
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
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
                let CTSDoanhNghiep = await CTSDoanhNghiepService.getPendingByUserId(agency._id)
                if(CTSDoanhNghiep.length==1){
                    if(CTSDoanhNghiep[0].trangThai==1 || CTSDoanhNghiep[0].trangThai==4){
                        result.push(...CTSDoanhNghiep)
    
                    }
                }else if(CTSDoanhNghiep.length!=0){
                    CTSDoanhNghiep.map(cts=>{
                        if(cts.trangThai==1 || cts.trangThai==4){
                            result.push(cts)
                        }
                    })
                }
            })

        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/approved-by-agency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getApprovedByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                if(CTSDoanhNghiep[0].trangThai==5 || CTSDoanhNghiep[0].trangThai==6 || CTSDoanhNghiep[0].trangThai==7){
                    result.push(...CTSDoanhNghiep)
                }
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
                    if(cts.trangThai==5 || cts.trangThai==6 || cts.trangThai==7){
                        result.push(cts)
                    }
                })
            }
        }
        //daily2
        for(let i=0; i<agencyList.length; i++){
            let agency2 = await usersService.getByBelongTo(agencyList[i]._id)
            agency2.forEach( async agency => {
                let CTSDoanhNghiep = await CTSDoanhNghiepService.getApprovedByUserId(agency._id)
                if(CTSDoanhNghiep.length==1){
                    if(CTSDoanhNghiep[0].trangThai==5 || CTSDoanhNghiep[0].trangThai==6 || CTSDoanhNghiep[0].trangThai==7){
                        result.push(...CTSDoanhNghiep)
    
                    }
                }else if(CTSDoanhNghiep.length!=0){
                    CTSDoanhNghiep.map(cts=>{
                        if(cts.trangThai==5 || cts.trangThai==6 || cts.trangThai==7){
                            result.push(cts)
                        }
                    })
                }
            })

        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
//daily 1
router.get('/digital-certificate/organization/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getPendingByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                result.push(...CTSDoanhNghiep)
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
                    result.push(cts)
                })
            }
        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/approved-agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getApprovedByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                if(CTSCaNhan[0].trangThai==5 || CTSCaNhan[0].trangThai==6 || CTSCaNhan[0].trangThai==7){
                    result.push(...CTSDoanhNghiep)
                }
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
                    if(cts.trangThai==5 || cts.trangThai==6 || cts.trangThai==7){
                        result.push(cts)
                    }
                })
            }
        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getById(id)
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;