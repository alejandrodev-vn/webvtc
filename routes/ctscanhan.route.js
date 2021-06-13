const express = require('express');
const router = express.Router();
const { validateCTSCaNhan } = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')
const middlewares = require('../middlewares/authencation')



router.get('/digital-certificate/personal',middlewares.checkAuthencation, controllerCTSCaNhan.personal);
router.post('/digital-certificate/personal/add',middlewares.checkAuthencation, validateCTSCaNhan(), controllerCTSCaNhan.add);
router.post('/digital-certificate/personal/send-response',middlewares.checkIsAdmin, controllerCTSCaNhan.sendResponse);
router.post('/digital-certificate/personal/send-mail/:id',middlewares.checkAuthencation, controllerCTSCaNhan.sendMail);
router.post('/digital-certificate/personal/handle-form-actions',middlewares.checkAuthencation, controllerCTSCaNhan.handleFormActions);
router.post('/digital-certificate/personal/edit',middlewares.checkAuthencation, validateCTSCaNhan(), controllerCTSCaNhan.update);


module.exports = router;