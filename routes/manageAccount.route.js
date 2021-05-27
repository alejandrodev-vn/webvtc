const express = require('express');
const router = express.Router();

const controller = require('../controllers/manageAccount.controller')


router.get('/manage-account', function(req, res,next){
    res.render('manage-account')
})




module.exports = router;