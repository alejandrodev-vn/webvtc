const express = require('express');
var multer  = require('multer')
const router = express.Router();
const { validateCTSCaNhan } = require('../middlewares/ctscanhan.validate')

const controllerCTSCaNhan = require('../controllers/ctscanhan.controller')
const middlewares = require('../middlewares/authencation')
var upload = require('../multer')



router.get('/digital-certificate/personal',middlewares.checkAuthencation, controllerCTSCaNhan.personal);
router.post('/digital-certificate/personal', middlewares.checkAuthencation,upload.single('fileHoSo'), validateCTSCaNhan(), controllerCTSCaNhan.add);
router.post('/digital-certificate/personal/send-response',middlewares.checkIsAdmin, controllerCTSCaNhan.sendResponse);
router.post('/digital-certificate/personal/send-mail/:id',middlewares.checkAuthencation, controllerCTSCaNhan.sendMail);
router.post('/digital-certificate/personal/handle-form-actions',middlewares.checkAuthencation, controllerCTSCaNhan.handleFormActions);
router.post('/digital-certificate/personal/edit',middlewares.checkAuthencation,upload.single('fileHoSo'), validateCTSCaNhan(), controllerCTSCaNhan.update);
router.get('/digital-certificate/personal/confirm/:token', controllerCTSCaNhan.renderConfirm);
router.post('/digital-certificate/personal/confirm/:token', controllerCTSCaNhan.confirm);

module.exports = router;