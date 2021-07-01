const express = require('express');
const router = express.Router();

const controllerGiaoDich = require('../controllers/giaodich.controller')

router.get('/giaodich', controllerGiaoDich.getAll);
router.post('/giaodich', controllerGiaoDich.add);
module.exports = router;
