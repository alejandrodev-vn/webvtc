const express = require('express');
const router = express.Router();

const controllerGoiDichVu = require('../controllers/goidichvu.controller')

router.post('/services/add', controllerGoiDichVu.add);
router.put('/services/edit/:id', controllerGoiDichVu.update);
router.delete('/services/delete/:id', controllerGoiDichVu.delete);

module.exports = router;