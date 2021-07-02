const express = require('express');
const router = express.Router();
const ReportService = require('../../services/report.service')
const UsersService = require('../../services/users.service')

router.get('/report', async (req, res, next) => {
    try{
        const { mst, typeReport, tokenId, serialNumber } = req.query
        if(typeReport == '1'){
            if(mst){
                const result = await ReportService.reportByMST(mst)
                if(result){
                    return res.json(result)
                }else return res.json([])
            }else if(tokenId){
                const result = await ReportService.reportByTokenId(tokenId)
                if(result){
                    return res.json(result)
                }else return res.json([])
            }else if(serialNumber){
                const result = await ReportService.reportBySerialNumber(serialNumber)
                if(result){
                    return res.json(result)
                }else return res.json([])
            }
      
        }else{
            let { role, userId} = req.session
            let services = req.query.services
            let agency = req.query.agency
            let dateBegin = req.query.dateBegin
            let getDateEnd = req.query.dateEnd
            let status = req.query.status

            if(getDateEnd!=''){
                let temp = new Date(getDateEnd)
                var dateEnd = temp.setDate(temp.getDate() + 1);
            }else var dateEnd = ''
            
            if (services == '' || agency == '' || dateBegin == '' || dateEnd == '' 
                 || status == '' || actionBy == '') {
                if (services == '') {
                    services = { $ne: null }
                }
                if (agency == '') {
                    if(role == 0){
                        var user = {role:0}
    
                    }else if(role == 1){
                        var user = {role:1}
                        user.listAgency = await UsersService.getByBelongTo(userId)
                        user.listAgency.forEach(async (agency1)=>{
                            let agency2 = await UsersService.getByBelongTo(agency1._id)
                            user.listAgency.push(agency2)
                        })
                    }else if(role==2){
                        var user = {role:2}
                        user.listAgency = await UsersService.getByBelongTo(userId)
                    }else if(role == 3){
                        var user = {role:3,listAgency:userId}
    
                    }
                }else var user = agency
               
                if (dateBegin == '') {
                    dateBegin = 0
                }
                if (dateEnd == '') {
                    let hienTai = new Date()
                    let date0 = new Date(0)
    
                    dateEnd = hienTai - date0
                }
                if (status == '') {
                    status = { $ne: null }
                }
             
                const result = await ReportService.getReport(typeReport, user, 
                    dateBegin, dateEnd, status, services)
                return  res.json(result)
            } else {
                const result = await ReportService.getReport(typeReport, user, 
                    dateBegin, dateEnd, status, services)
                return res.json(result)
            }
        }
     
    }   
    catch(err){
        console.log(err)
    }
});



module.exports = router;