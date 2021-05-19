const express = require('express');
const router = express.Router();

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')


router.get('/', controllerCTSCaNhan.getAll);
router.get('/users', controllerCTSCaNhan.getUsers);
router.get('/provinces', controllerCTSCaNhan.getTinhThanh);
router.post('/users', controllerCTSCaNhan.postUsers);


module.exports = router;