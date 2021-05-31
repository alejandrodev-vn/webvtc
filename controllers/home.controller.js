module.exports.index = (req, res, next)=> {
    const { role } = req.session
    if(role == 0){
        res.render('indexAdmin1', { title: 'Danh sách phiếu yêu cầu 1' }) 
    }else if(role == 1){
        res.render('indexAdmin2', { title: 'Danh sách phiếu yêu cầu 2' }) 
    }else if(role == 2){
        res.render('indexDaiLy1', { title: 'Danh sách yêu cầu cung cấp dịch vụ' }) 
    }else if(role == 3){
        res.render('indexDaiLy2', { title: 'Danh sách yêu cầu cung cấp dịch vụ' }) 
    }
}

