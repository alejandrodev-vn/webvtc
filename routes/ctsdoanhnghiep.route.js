const express = require('express');
const router = express.Router();
const { validateCTSDoanhNghiep } = require('../middlewares/ctsdoanhnghiep.validate')

const controllerCTSDoanhNghiep = require('../controllers/ctsdoanhnghiep.controller')


// router.get('/ctscanhan', controllerCTSCaNhan.getAll);
router.get('/digital-certificate/organization', function(req, res, next) {
    res.render('organization', { title: 'CTS Doanh nghiệp' });
});
router.post('/digital-certificate/organization/add', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.add);
router.put('/digital-certificate/organization/edit/:id', validateCTSDoanhNghiep(), controllerCTSDoanhNghiep.update);
router.delete('/digital-certificate/organization/delete/:id', controllerCTSDoanhNghiep.delete);


module.exports = router;