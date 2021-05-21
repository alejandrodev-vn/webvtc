const express = require('express');
const router = express.Router();
const {validateCTSCaNhan} = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')


// router.get('/ctscanhan', controllerCTSCaNhan.getAll);
router.post('/digital-certificate/personal/add', validateCTSCaNhan(), controllerCTSCaNhan.addCTSCaNhan);
router.put('/digital-certificate/personal/edit/:id', validateCTSCaNhan(), controllerCTSCaNhan.editCTSCaNhan);
router.delete('/digital-certificate/personal/delete/:id', validateCTSCaNhan(), controllerCTSCaNhan.deleteCTSCaNhan);


module.exports = router;