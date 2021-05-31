const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home.controller')
const middlewares  = require('../middlewares/authencation')

router.get('/',middlewares.checkAuthencation, controllerHome.index);




module.exports = router;