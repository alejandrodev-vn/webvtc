const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home.controller')


router.get('/', controllerHome.index);


module.exports = router;