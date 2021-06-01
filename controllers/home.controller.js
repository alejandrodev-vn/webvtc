module.exports.index = (req, res, next)=> {
    const { role } = req.session
    if(role == 0 || role == 1){
        res.render('indexAdmin', { title: 'Danh sách phiếu yêu cầu' }) 
    }else{
        res.render('indexDaiLy', { title: 'Danh sách yêu cầu cung cấp dịch vụ' }) 
    }
}

