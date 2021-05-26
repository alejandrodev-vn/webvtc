const express = require('express');
const router = express.Router();

const controllerProvinces = require('../controllers/provinces.controller')

router.post('/provinces/add', controllerProvinces.add);
router.put('/provinces/edit/:id', controllerProvinces.update)
router.delete('/provinces/delete/:id', controllerProvinces.delete)


module.exports = router;