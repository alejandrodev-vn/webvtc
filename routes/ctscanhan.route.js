const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')


// router.get('/ctscanhan', controllerCTSCaNhan.getAll);

router.get('/digital-certificate/personal', controllerCTSCaNhan.personal);
  
router.post('/digital-certificate/personal/add' , controllerCTSCaNhan.add);
router.put('/digital-certificate/personal/edit/:id', middleware.validateCTSCaNhan, controllerCTSCaNhan.update);
router.delete('/digital-certificate/personal/delete/:id', controllerCTSCaNhan.delete);


module.exports = router;