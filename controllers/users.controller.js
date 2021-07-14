const usersService = require('../services/users.service');
const TinhThanhService = require('../services/provinces.service');

module.exports.authencation = async (req, res, next)=> {
    res.render('authentication',{ title: 'Đăng nhập', message:req.session.message })
}
module.exports.renderForgot = async (req, res, next)=> {
    res.render('forgot-password',{ title: 'Quên mật khẩu', message:req.session.message })
}
module.exports.profile = async (req, res, next)=> {
    try{
        const {userId} = req.session
        const user = await usersService.getById(userId)
        let role = ''
        if(user.role==0) { role = 'Admin 1' }
        if(user.role==1) { role = 'Admin 2' }
        if(user.role==2) { role = 'Đại lý 1' }
        if(user.role==3) { role = 'Đại lý 2' }
        const tinhThanh = await TinhThanhService.getById(user.tinhThanhID)
        return res.render('profile',{ 
            title: 'Thông tin cá nhân',
            user,
            role,
            tinhThanh:tinhThanh.TenTinhThanh, 
            message:null 
        })
    }catch(err){
        console.log(err)
    }
}


module.exports.add = async (req, res, next)=> {
    try{
       let values = req.body
       const user = await usersService.getByUsername(values.username)
       values.belongTo = values.belongTo.trim()
       if(user){
        const { role } = req.session
            if(role===0){
                return res.render('manage-account-admin1',{message:'Tài khoản đã tồn tại!',urlRedirect:'manage-account'})
            }else if(role===1 || role ===2){
                return res.render('manage-account',{message:'Tài khoản đã tồn tại!',urlRedirect:'manage-account'})
            }else{
                return res.redirect('/')
            }
       }
       await usersService.createNew(values)
       res.status(200).redirect('/manage-account')
    }
    catch(err){
        console.log(err)
    }
}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await usersService.update(id, values);
        res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.changeStatusAccount = async (req, res, next) => {
    try{
        let { selectAccount,selectAccountFind, notActive, isActive } = req.body;
        if(selectAccount){
            if(notActive != undefined){
                await usersService.changeStatus(selectAccount, {isActive:false});
                return res.redirect('/manage-account')
            }else if(isActive != undefined){ 
                await usersService.changeStatus(selectAccount, {isActive:true});
                return res.redirect('/manage-account')
            }else{
                return res.redirect('/')
            }
        }else {
            if(notActive != undefined){
                await usersService.changeStatus(selectAccountFind, {isActive:false});
                return res.redirect('/manage-account')
            }else if(isActive != undefined){ 
                await usersService.changeStatus(selectAccountFind, {isActive:true});
                return res.redirect('/manage-account')
            }else{
                return res.redirect('/')
            }
        }
      
    }
    catch(err){
        console.log(err)
    }
}
module.exports.changePassword = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
        console.log(values);
        await usersService.changePassword(id, values);
        req.session.destroy();
        return res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.postForgotPassword = async (req, res, next) => {
    const { username } = req.body 
    const user = await usersService.getByUsername(username)
    if(user.length==0) return res.render('forgot-password',{ title:"Quên mật khẩu", message:"Tài khoản không tồn tại"})
    if(!user[0].email) return res.render('reset-password',{ title:"Quên mật khẩu", message:"Tài không tồn tại email! Vui lòng liên hệ nhà cung cấp"})
    const nodemailer = require('nodemailer')
    const jwt = require('jsonwebtoken')
    let token = jwt.sign({ username: user[0].username, userId: user[0]._id }, process.env.KEY,{
        expiresIn: '5m' /*<---- this is 5 minutes */
    }, (err, token) => {
        if (err) {
            console.log('Token sign failed');
        }else{
            var transporter =  nodemailer.createTransport({ // config mail server
                service:"gmail",
                auth: {
                    user: 'huytrafpt@gmail.com',
                    pass: 'Huytra2642001'
                },
                tls: {rejectUnauthorized:false}
        
            });
            var mainOptions = { 
                from: 'SmartSign<smartsign@gmail.com>',
                to: user[0].email,
                subject: `Kính gửi Ông/Bà ${user[0].hoTen}.`,
                text: `Xác nhận`,
                html: `<h4>SmartSign - Khôi phục mật khẩu</h4>
                <body style="background:#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
        
                <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                    <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                    <tbody>
                        <tr>
                        <td align="center" class="vervelogoplaceholder" height="143" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;height:143px;vertical-align:middle;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22160%22%2C%22height%22%3A34%2C%22alt_text%22%3A%22Verve%20Wine%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="#" target="_blank"><img alt="Verve Wine" height="34" src="https://marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png" style="border-width: 0px; width: 160px; height: 34px;" width="160"></a></span></td>
                        </tr>
                        <!-- Start of Email Body-->
                        <tr>
                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                            <!--[if gte mso 9]>
                                <center>
                                <table width="80%" cellpadding="20" cellspacing="30"><tr><td valign="top">
                                <![endif]-->
                            <table style="border-spacing:0;" width="100%">
                            <tbody>
                                <tr>
                                <td align="center" class="inner" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22255%22%2C%22height%22%3A93%2C%22alt_text%22%3A%22Forgot%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><img alt="Forgot Password" class="banner" height="93" src="https://marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png" style="border-width: 0px; margin-top: 30px; width: 255px; height: 93px;" width="255"></span></td>
                                </tr>
                                <tr>
                                <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                    <center>
                                    <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Quên mật khẩu?</p>
                                    <!--[if (gte mso 9)|(IE)]><![endif]-->
            
                                    <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Đừng lo lắng! Hãy truy cập vào đây để khôi phục mật khẩu</span></p>
                                    <!--[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22260%22%2C%22height%22%3A54%2C%22alt_text%22%3A%22Reset%20your%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D">
                                    <a href="http://localhost:3000/users/reset/${token}" target="_blank"><button alt="Reset your Password" height="54"  style="border-width: 0px;cursor: pointer;background-color: #000 ;color: #eee;margin-top: 30px; margin-bottom: 50px; width: 260px; height: 54px;" width="260">Khôi phục mật khẩu</button></a></span>
                                    <!--[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]--></center>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                        </td>
                        </tr>
                        <!-- End of Email Body-->
                        
                    </tbody>
                    </table>
                </div>
                </center>
        
            
            </body>
                `
            }
            
            transporter.sendMail(mainOptions, async function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log('Message sent: ' +  info.response);
                    res.render('forgot-password',{message:"Email khôi phục đã được gửi đến: " + user[0].email});
                }
            });
        }
    }) 
  }
module.exports.resetPassword = (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, (err, decode)=>{
        if(err){
            return res.render('reset-password', {  message: 'Quá thời hạn xác thực' })

        }else{
           return res.render('reset-password', {  token: token, username:decode.username })
        }
    })
}
module.exports.postNewPassword = (req, res, next) => {
    const { token } = req.params
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.KEY, async (err, decode)=>{
        if(err){
            return res.render('reset-password', {  message: 'Token failed!' })

        }else{
           const id = decode.userId;
           let values = req.body;
           await usersService.changePassword(id, values);
           return res.redirect('/users/login')
        }
    })
}
module.exports.login = async (req, res, next) => {
    try{
        let values = req.body;
        const user = await usersService.login(values);
        if(values.username.trim().length==0 || values.password.trim().length==0){
            req.session.message = 'Tài khoản hoặc mật khẩu không được trống!'
            return res.redirect('/users/login')
        }
        if(user.error === 'User not found'){
            req.session.message = 'Tài khoản không tồn tại!'
            return res.redirect('/users/login')
        }else if(user.error === 'Password error'){
            req.session.message = 'Sai mật khẩu!'
            return res.redirect('/users/login')
        }else if(user.error === "Account is not active"){
            req.session.message = 'Tài khoản đã bị vô hiệu hóa!'
            return res.redirect('/users/login')
        }else{
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({ username: user.username }, process.env.KEY,{
                expiresIn: '24h' /*<---- this is 24h */
            }, (err, token) => {
                if (err) {
                    console.log('Token sign failed');
                }else{
                    req.session.token = token
                    req.session.userId = user._id
                    req.session.role = user.role
                    req.session.hoTen = user.hoTen
                    req.session.username = user.username
                    res.redirect('/')
                }
            }) 
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.logout = (req, res, next) => {
    res.clearCookie('connect.sid', { path: '/' })
    res.redirect('/users/login')
}
