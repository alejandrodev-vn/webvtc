const express = require('express');
const router = express.Router();
const giaoDichService = require('../../services/giaodich.service');
const userService = require('../../services/users.service');

router.get('/giaodich', async (req, res, next) => {
    try{
        const giaoDich = await giaoDichService.getAll()
        res.json(giaoDich)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/giaodich/get-by-user', async (req, res, next) => {
    try{
        let auth = req.headers.authorization
        let token = auth.split(' ')[1]
        jwt.verify(token, process.env.KEY, async (err, decode)=>{
            if(!err){
                res.json({success:false, msg:'Unauthorized'})
            }else{
                const giaoDich = await giaoDichService.getByUser(id)
                res.json(giaoDich)
            }
        })
       
    }   
    catch(err){
        console.log(err)
    }
});


router.get('/giaodich/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const giaoDich = await giaoDichService.getById(id)
        res.json(giaoDich)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;