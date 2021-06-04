module.exports.getOTP = (req, res, next) => {
    res.render('sendOTP', { title: 'Gửi mã xác thực OTP' })
}