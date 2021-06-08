const express = require('express');
const router = express.Router();
const CTSDoanhNghiepService = require('../../services/ctsdoanhnghiep.service')
const usersService = require('../../services/users.service')

router.get('/digital-certificate/organization', async (req, res, next) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getAll()
        res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/digital-certificate/organization/byUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSDoanhNghiep = await CTSDoanhNghiepService.getByUserId(userId)
        res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/byAgency', async (req, res, next)=> {
    try{
        const { userId } = req.session
        //daily1
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                if(CTSDoanhNghiep[0].trangThai==1 || CTSDoanhNghiep[0].trangThai==3){
                    result.push(...CTSDoanhNghiep)

                }
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
                    if(cts.trangThai==1 || cts.trangThai==3){
                        result.push(cts)
                    }
                })
            }
        }
        //daily2
        for(let i=0; i<agencyList.length; i++){
            let agency2 = await usersService.getByBelongTo(agencyList[i]._id)
            agency2.forEach( async agency => {
                let CTSDoanhNghiep = await CTSDoanhNghiepService.getByUserId(agency._id)
                console.log(CTSDoanhNghiep)
                if(CTSDoanhNghiep.length==1){
                    if(CTSDoanhNghiep[0].trangThai==1 || CTSDoanhNghiep[0].trangThai==3){
                        result.push(...CTSDoanhNghiep)
    
                    }
                }else if(CTSDoanhNghiep.length!=0){
                    CTSDoanhNghiep.map(cts=>{
                        if(cts.trangThai==1 || cts.trangThai==3){
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

router.get('/digital-certificate/organization/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await CTSDoanhNghiepService.getByUserId(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                result.push(...CTSDoanhNghiep)
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
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

router.get('/digital-certificate/organization/:id', async (req, res, next)=> {
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