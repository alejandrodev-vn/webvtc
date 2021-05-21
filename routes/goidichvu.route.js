const express = require('express');
const router = express.Router();

const controllergoidichvu = require('../controllers/goidichvu.controller')

router.post('/goidichvu/add', controllergoidichvu.addgoidichvu);
module.exports = router;
