const express = require('express');
const router = express.Router();

const controllerprovinces = require('../controllers/provinces.controller')

router.post('/provinces/add', controllerprovinces.addTinhThanh);
router.put('/provinces/edit/:id', controllerprovinces.updateTinhThanh)
router.delete('/provinces/delete/:id', controllerprovinces.deleteTinhThanh)


module.exports = router;