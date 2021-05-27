const express = require('express');
const router = express.Router();
const {validateCTSCaNhan} = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')



router.get('/digital-certificate/personal', controllerCTSCaNhan.personal);
router.post('/digital-certificate/personal/add', validateCTSCaNhan(), controllerCTSCaNhan.add);
router.put('/digital-certificate/personal/edit/:id', validateCTSCaNhan(), controllerCTSCaNhan.update);
router.delete('/digital-certificate/personal/delete/:id', controllerCTSCaNhan.delete);


module.exports = router;