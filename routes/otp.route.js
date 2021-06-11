const express = require('express');
const router = express.Router();

const controllerOTP = require('../controllers/otp.controller')

router.get('/digital-certificate/personal/get-otp/:token', controllerOTP.getOTP);




module.exports = router;