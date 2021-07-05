const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneServer = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken);

module.exports.getOTP = (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, (err, decode)=>{
        if(err){
            return res.render('otp/send-otp-personal', { title: 'Gửi mã xác thực OTP', message: 'Quá thời hạn xác thực',token: token })

        }else{
           return res.render('otp/send-otp-personal', { title: 'Gửi mã xác thực OTP', idCer: decode.idCer, soDienThoai:decode.soDienThoai, token:token })

        }
    })
}
module.exports.postSendOTP = async (req, res, next) => {
    const { soDienThoai } = req.body
    const { token } = req.params  
    console.log(token)
    console.log(soDienThoai)
    client
        .verify
        .services(accountSid)
        .verifications
        .create({
            body: '<SmartSign> Xác thực OTP:',
            to: '+84704633073',
            channel:'sms'
        
        })
        .then(message =>{
            console.log(message);
        return res.redirect('/digital-certificate/personal/verify-otp/'+token)

        }).catch(err =>{console.log(err)})
  }
module.exports.verifyOTP =  async (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken')
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('otp/verify-otp-personal', {  message: 'Token failed!' })

        }else{
            return res.render('otp/verify-otp-personal',{token:token})
        }
    })
}
module.exports.postVerifyOTP =  async (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken')
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('verify-otp-personal', {  message: 'Token failed!' })

        }else{
            res.redirect('/digital-certificate/personal/'+token)
        }
    })
}
//organization
module.exports.getOTPOrg = (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, (err, decode)=>{
        if(err){
            return res.render('otp/send-otp-org', { title: 'Gửi mã xác thực OTP', message: 'Quá thời hạn xác thực',token: token })

        }else{
           return res.render('otp/send-otp-org', { title: 'Gửi mã xác thực OTP', idCer: decode.idCer, soDienThoai:decode.soDienThoai, token:token })

        }
    })
}
module.exports.postSendOTP = async (req, res, next) => {
    const { soDienThoai } = req.body
    const { token } = req.params  
    console.log(token)
    console.log(soDienThoai)
    client
        .verify
        .services(accountSid)
        .verifications
        .create({
            body: '<SmartSign> Xác thực OTP:',
            to: '+84704633073',
            channel:'sms'
        
        })
        .then(message =>{
            console.log(message);
        return res.redirect('/digital-certificate/organization/verify-otp/'+token)

        }).catch(err =>{console.log(err)})
  }
module.exports.verifyOTP =  async (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken')
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('otp/verify-otp-oerg', {  message: 'Token failed!' })

        }else{
            return res.render('otp/verify-otp-org',{token:token})
        }
    })
}
module.exports.postVerifyOTP =  async (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken')
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('verify-otp-org', {  message: 'Token failed!' })

        }else{
            res.redirect('/digital-certificate/organization/'+token)
        }
    })
}



