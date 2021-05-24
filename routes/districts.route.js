const express = require('express');
const router = express.Router();

const controllerdistricts = require('../controllers/districts.controller')

router.post('/districts/add', controllerdistricts.adddistricts);
router.put('/districts/edit/:id', controllerdistricts.updatedistricts)
router.delete('/districts/delete/:id', controllerdistricts.deletedistricts)
module.exports = router;
