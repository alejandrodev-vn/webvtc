module.exports.getOTP = (req, res, next) => {
    const { token, id } = req.params
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, (err, decode)=>{
        if(err){
            return res.render('sendOTP', { title: 'Gửi mã xác thực OTP', notifications: 'Quá thời hạn xác thực' })

        }else{
           return res.render('sendOTP', { title: 'Gửi mã xác thực OTP', idCer: decode.idCer, soDienThoai:decode.soDienThoai })

        }
    })
}