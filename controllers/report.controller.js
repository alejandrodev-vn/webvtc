const reportService =  require('../services/report.service');
module.exports.renderReport = (req, res, next) => {
    try{
        res.render('report', { title: 'Báo cáo thống kê', message: null});
    }catch(err){
        console.log(err)
    }
}