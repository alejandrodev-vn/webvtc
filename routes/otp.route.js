const express = require('express');
const router = express.Router();

const controllerOTP = require('../controllers/otp.controller')
const middlewares = require('../middlewares/authencation')

router.get('/digital-certificate/personal/get-otp/:id', controllerOTP.getOTP);




module.exports = router;