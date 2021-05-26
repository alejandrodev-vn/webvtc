const express = require('express');
const router = express.Router();

const controllerGiaoDich = require('../controllers/giaodich.controller')

router.post('/giaodich/add', controllerGiaoDich.add);
router.put('/giaodich/edit/:id', controllerGiaoDich.update)
router.delete('/giaodich/delete/:id', controllerGiaoDich.delete)
module.exports = router;
