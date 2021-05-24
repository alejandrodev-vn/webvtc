const express = require('express');
const router = express.Router();
const usersService = require('../../services/users.service')

router.get('/users', async (req, res, next) => {
    try{
        const users = await usersService.getAll()
        res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});

router.get('/users/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const user = await usersService.getById(id)
        res.json(user)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;