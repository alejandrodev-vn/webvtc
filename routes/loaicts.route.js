const express = require('express');
const router = express.Router();

const controllerLoaiCTS = require('../controllers/loaicts.controller')

router.post('/type/add', controllerLoaiCTS.add);
router.put('/type/edit/:id', controllerLoaiCTS.update)
router.delete('/type/delete/:id', controllerLoaiCTS.delete)


module.exports = router;