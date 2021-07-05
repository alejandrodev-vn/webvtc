const express = require('express');
const router = express.Router();

const controllerOTP = require('../controllers/otp.controller')

router.get('/digital-certificate/personal/verify-otp/:token', controllerOTP.verifyOTP)
// router.post('/digital-certificate/personal/verify-otp/:token')
router.get('/digital-certificate/personal/get-otp/:token', controllerOTP.getOTP);
router.post('/digital-certificate/personal/get-otp/:token', controllerOTP.postSendOTP);





module.exports = router;