const express = require('express');
const router = express.Router();
const ReportService = require('../../services/report.service')

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
            
            let services = req.query.services
            let agency = req.query.agency
            let dateBegin = req.query.dateBegin
            let getDateEnd = req.query.dateEnd
            let status = req.query.status
            let actionBy = req.query.actionBy
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
                    agency = { $ne: null }
                }
                if (actionBy == '') {
                    actionBy = { $ne: null }
                }
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
                const result = await ReportService.getReport(typeReport, agency, actionBy, 
                    dateBegin, dateEnd, status, services)
                return  res.json(result)
            } else {
                const result = await ReportService.getReport(typeReport, agency, actionBy, 
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