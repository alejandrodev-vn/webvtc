const express = require('express');
const router = express.Router();

const controllerdistricts = require('../controllers/districts.controller')

router.post('/districts/add', controllerdistricts.add);
router.put('/districts/edit/:id', controllerdistricts.update)
router.delete('/districts/delete/:id', controllerdistricts.delete)
module.exports = router;