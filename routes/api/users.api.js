const express = require('express');
const router = express.Router();
const usersService = require('../../services/users.service')

router.get('/users', async (req, res, next) => {
    try{
        const users = await usersService.getAll()
        return res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/admin', async (req, res, next) => {
    try{
        const users = await usersService.getAllAdmin()
        return res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/agency', async (req, res, next) => {
    try{
        const users = await usersService.getAllAgency()
        res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/manage-account/find-by-username', async (req, res, next) => {
    try{
        const { username } = req.query
        const { role,userId } = req.session
        if(role==0){
            let listAgency=[]
            const users = await usersService.findByUsername(username,role,userId,listAgency)
            return res.json(users)
        }else if(role==1){
            let listAgency = await usersService.getByBelongTo(userId)
            listAgency.forEach(async (agency1)=>{
                let agency2 = await usersService.getByBelongTo(agency1._id)
                listAgency.push(agency2)
            })
            const users = await usersService.findByUsername(username,role,userId,listAgency)
            return res.json(users)
        }else if(role==2){
            let listAgency = await usersService.getByBelongTo(userId)
            const users = await usersService.findByUsername(username,role,userId,listAgency)
            res.json(users)
        }else{
            res.redirect('/')
        }
       
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/users/byBelongTo', async (req, res, next)=> {
    try{
        const { userId } = req.session
        if(!userId){
            return res.json([])
        }
        const user = await usersService.getByBelongTo(userId)
        return res.json(user)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/for-admin-2', async (req, res, next)=> {
    try{
        const { userId } = req.session
        if(!userId){
            return res.json([])
        }
        const agency1List = await usersService.getByBelongTo(userId)
        for(let i=0; i<agency1List.length; i++){
            let agency2 = await usersService.getByBelongTo(agency1List[i]._id)
            if(agency2.length!==0){
                agency1List.push(...agency2)
            }
        }
        return res.json(agency1List)
    }   
    catch(err){
        console.log(err)
    }
});
router.post('/users/cmnd-front/:id', async (req, res, next) => {
    const { id } = req.params
    const {image} = req.body;
    let r = await usersService.updateCMNDFront(id, image)
    res.json(r)
})

router.post('/users/cmnd-back/:id', async (req, res, next) => {
    const { id } = req.params
    const {image} = req.body;
    let r = await usersService.updateCMNDBack(id, image)
    res.json(r)
})

router.get('/users/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const user = await usersService.getById(id)
        return res.json(user)
    }   
    catch(err){
        console.log(err)
    }
});
//for mobile
router.post('/users/login', async (req, res, next) => {
    try{
        let values = req.body;
        
        const user = await usersService.login(values);
        if(user.error === 'User not found'){
            return res.status(404).json({success: false, msg: user.error})
        }else if(user.error === 'Password error'){
            return res.status(401).json({success: false, msg: user.error})
        }else{
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({_id: user._id, username: user.username, hoTen: user.hoTen, gender: user.gender, soDienThoai: user.soDienThoai, diaChi: user.diaChi }, process.env.KEY)
            return res.json({success: true, token: token})
        }
    }catch(err){
        console.log(err)
    }
})

var auth = require('./authMobile.api');

router.post('/users/info', auth.checkAuthencation, async (req, res, next) => {
    
})

router.post('/users/change-password/:id', async (req, res, next) => {
    let id = req.params.id;
    let values = req.body;
    let r = usersService.changePassword(id, values);
    if(r){
        res.json({success: true, msg: "change password done!"})
    }else{
        res.json({success: false, msg: "change password fail!"})
    }
})

router.post('/users/update-info/:id', async (req, res, next) => {
    let id = req.params.id;
    let values = req.body;
    let r = usersService.update(id, values);
    if(r){
        res.json({success: true, msg: "change info done!"})
    }else{
        res.json({success: false, msg: "change info fail!"})
    }
})

router.get('/users/cmnd-info/:id', async (req, res, next) => {
    let id = req.params.id;
    let u = await usersService.getCMND(id);
    res.json({CMNDFront: u.CMNDFront, CMNDAfter: u.CMNDAfter})
})

module.exports = router;