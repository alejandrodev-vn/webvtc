const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home.controller')


router.get('/', controllerHome.index);
// // router.get('/users', controllerHome.getUsers);
// // router.post('/users', controllerHome.postUsers);
// // router.get('/provinces', controllerHome.getAllTinhThanh);
// router.post('/provinces/add', controllerHome.addTinhThanh);
// router.post('/goidichvu/add', controllerHome.addgoidichvu);

// router.put('/provinces/edit/:id', controllerHome.updateTinhThanh)
// router.delete('/provinces/delete/:id', controllerHome.deleteTinhThanh)
// // router.get('/provinces/:id', controllerHome.getTinhThanhById);
router.get('/tochuc', function(req, res, next) {
    res.render('organization', { title: '  Tổ chức doanh nghiệp' });
  });
  router.get('/canhan', function(req, res, next) {
    res.render('personal', { title: '  Tổ chức cá nhân' });
  });
  



module.exports = router;