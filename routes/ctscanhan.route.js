const express = require('express');
const router = express.Router();
const { validateCTSCaNhan } = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')
const middlewares = require('../middlewares/authencation')



router.get('/digital-certificate/personal',middlewares.checkAuthencation, controllerCTSCaNhan.personal);
router.post('/digital-certificate/personal/add', validateCTSCaNhan(), controllerCTSCaNhan.add);
router.post('/digital-certificate/personal/send-request', controllerCTSCaNhan.sendRequest);
router.post('/digital-certificate/personal/send-response', controllerCTSCaNhan.sendResponse);
router.post('/digital-certificate/personal/edit', validateCTSCaNhan(), controllerCTSCaNhan.update);
router.delete('/digital-certificate/personal/delete/:id', controllerCTSCaNhan.delete);


module.exports = router;