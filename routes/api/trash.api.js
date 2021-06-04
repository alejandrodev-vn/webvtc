const express = require('express');
const router = express.Router();
const trashService = require('../../services/trash.service')
const usersService = require('../../services/users.service')
//trash
router.get('/digital-certificate/personal/trash/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await trashService.getByTrashUserId(agencyList[i]._id)
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
router.get('/digital-certificate/personal/trash/byUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSCaNhan = await trashService.getByTrashUserId(userId)
        res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
//

module.exports = router;