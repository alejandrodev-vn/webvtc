const express = require('express');
const router = express.Router();

const controllerGoiDichVu = require('../controllers/goidichvu.controller')
const middlewares = require('../middlewares/authencation')

router.get('/services',middlewares.checkAdmin1, controllerGoiDichVu.getAll);
router.post('/services',middlewares.checkAdmin1, controllerGoiDichVu.add);
router.post('/services/edit',middlewares.checkAdmin1, controllerGoiDichVu.update);
router.post('/services/delete/:id',middlewares.checkAdmin1, controllerGoiDichVu.delete);

module.exports = router;