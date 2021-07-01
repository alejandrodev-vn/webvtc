const express = require('express');
const router = express.Router();
const ReportService = require('../../services/report.service')

router.get('/report', async (req, res, next) => {
    try{
        const { mst } = req.query
        const result = await ReportService.reportByMST(mst)
        if(result){
            res.json(result)
        }else res.json({})
    }   
    catch(err){
        console.log(err)
    }
});



module.exports = router;