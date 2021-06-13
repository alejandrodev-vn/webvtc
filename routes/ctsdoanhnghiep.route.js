const express = require('express');
const router = express.Router();
const { validateCTSDoanhNghiep } = require('../middlewares/ctsdoanhnghiep.validate')

const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')
const middlewares = require('../middlewares/authencation')

router.get('/digital-certificate/organization',middlewares.checkAuthencation, controllerCTSDoanhNghiep.organization);
router.post('/digital-certificate/organization/add', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.add);
router.post('/digital-certificate/organization/edit',middlewares.checkAuthencation, validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.update);
router.post('/digital-certificate/personal/send-mail/:id',middlewares.checkAuthencation, controllerCTSDoanhNghiep.sendMail);
router.post('/digital-certificate/organization/send-response', controllerCTSDoanhNghiep.sendResponse);
router.post('/digital-certificate/organization/handle-form-actions', controllerCTSDoanhNghiep.handleFormActions);


module.exports = router;