const express = require('express');
const router = express.Router();

const controllergoidichvu = require('../controllers/goidichvu.controller')

router.post('/goidichvu/add', controllergoidichvu.addgoidichvu);
router.put('/goidichvu/edit/:id', controllergoidichvu.updategoidichvu)
router.delete('/goidichvu/delete/:id', controllergoidichvu.deletegoidichvu)
module.exports = router;
