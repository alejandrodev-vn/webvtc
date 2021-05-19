const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home.controller')


router.get('/', controllerHome.index);
router.get('/users', controllerHome.getUsers);
router.post('/users', controllerHome.postUsers);


module.exports = router;