module.exports.getOTP = (req, res, next) => {
    const { token, id } = req.params
    const jwt = require('jsonwebtoken');
    const decode = jwt.verify(token, process.env.KEY)
    if(decode){
        console.log(decode)
        res.render('sendOTP', { title: 'Gửi mã xác thực OTP', idCer: decode.idCer, soDienThoai:decode.soDienThoai })
    }else{  
        res.render('sendOTP', { title: 'Gửi mã xác thực OTP', notifications: 'Quá thời hạn xác thực' })
    }
}