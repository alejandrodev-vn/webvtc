const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home.controller')


router.get('/', controllerHome.index);
router.get('/users', controllerHome.getUsers);
router.post('/users', controllerHome.postUsers);
router.get('/provinces', controllerHome.getTinhThanh);
router.post('/provinces/add', controllerHome.addTinhThanh);
router.delete('/provinces/delete', controllerHome.deleteTinhThanh);


module.exports = router;