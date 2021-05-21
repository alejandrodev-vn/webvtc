const express = require('express');
const router = express.Router();
const {validateCTSDoanhNghiep} = require('../middlewares/ctsdoanhnghiep.validate')

const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')


// router.get('/ctscanhan', controllerCTSCaNhan.getAll);
router.post('/digital-certificate/company/add', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.add);
router.put('/digital-certificate/company/edit/:id', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.update);
router.delete('/digital-certificate/company/delete/:id', controllerCTSDoanhNghiep.delete);


module.exports = router;