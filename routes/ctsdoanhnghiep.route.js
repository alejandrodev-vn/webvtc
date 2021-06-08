const express = require('express');
const router = express.Router();
const { validateCTSDoanhNghiep } = require('../middlewares/ctsdoanhnghiep.validate')

const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')
const middlewares = require('../middlewares/authencation')



// router.get('/ctscanhan', controllerCTSCaNhan.getAll);
router.get('/digital-certificate/organization',middlewares.checkAuthencation, controllerCTSDoanhNghiep.organization);
router.post('/digital-certificate/organization/add', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.adds);
router.put('/digital-certificate/organization/edit/:id', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.update);
router.post('/digital-certificate/organization/send-response', controllerCTSDoanhNghiep.sendResponse);
router.post('/digital-certificate/organization/send-request', controllerCTSDoanhNghiep.sendRequest);
router.delete('/digital-certificate/organization/delete/:id', controllerCTSDoanhNghiep.delete);


module.exports = router;