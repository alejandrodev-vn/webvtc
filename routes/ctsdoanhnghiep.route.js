const express = require('express');
var multer  = require('multer')
const router = express.Router();

const { validateCTSDoanhNghiep } = require('../middlewares/ctsdoanhnghiep.validate')
const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')
const middlewares = require('../middlewares/authencation')
var upload = require('../multer')


router.get('/digital-certificate/organization',middlewares.checkAuthencation, controllerCTSDoanhNghiep.organization);
router.post('/digital-certificate/organization',middlewares.checkAuthencation,upload.single('fileHoSo'), validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.add);
router.post('/digital-certificate/organization/edit',middlewares.checkAuthencation,upload.single('fileHoSo'),validateCTSDoanhNghiep(),controllerCTSDoanhNghiep.update);
router.post('/digital-certificate/organization/send-mailOrg/:id',middlewares.checkAuthencation, controllerCTSDoanhNghiep.sendMail);
router.post('/digital-certificate/organization/send-response', controllerCTSDoanhNghiep.sendResponse);
router.post('/digital-certificate/organization/handle-form-actions', controllerCTSDoanhNghiep.handleFormActions);


module.exports = router;