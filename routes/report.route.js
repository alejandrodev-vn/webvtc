const express = require('express');
const router = express.Router();

const controllerReport = require('../controllers/report.controller')
const middlewares = require('../middlewares/authencation')

router.get('/report', controllerReport.renderReport);


module.exports = router;