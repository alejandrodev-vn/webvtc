const express = require('express');
const router = express.Router();
const { validateCTSDoanhNghiep } = require('../middlewares/ctsdoanhnghiep.validate')

const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')


// router.get('/ctscanhan', controllerCTSCaNhan.getAll);
router.get('/digital-certificate/organization', controllerCTSDoanhNghiep.organization);
router.post('/digital-certificate/organization/add', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.add);
router.put('/digital-certificate/organization/edit/:id', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.update);
router.post('/digital-certificate/organization/send-request', controllerCTSDoanhNghiep.sendRequest);
router.delete('/digital-certificate/organization/delete/:id', controllerCTSDoanhNghiep.delete);


module.exports = router;