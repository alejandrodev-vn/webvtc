const usersService = require('../services/users.service');
const TinhThanhService = require('../services/provinces.service');

module.exports.authencation = async (req, res, next)=> {
    res.render('authentication',{ title: 'Đăng nhập', message:req.session.message })
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
       if(user){
        const { role } = req.session
            if(role===0){
                return res.render('manage-account-admin1',{message:'Tài khoản đã tồn tại!'})
            }else if(role===1 || role ===2){
                return res.render('manage-account',{message:'Tài khoản đã tồn tại!'})
            }else{
                return res.redirect('/')
            }
       }
       await usersService.createNew(values)
       res.status(200).redirect('/')
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
module.exports.changePassword = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
        await usersService.changePassword(id, values);
        req.session.destroy();
        return res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

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
        }else if(user.error === 'Password error !!!'){
            req.session.message = 'Sai mật khẩu!'
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
