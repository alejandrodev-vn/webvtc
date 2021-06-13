const express = require('express');
const router = express.Router();

const controllerTrash = require('../controllers/trash.controller')
const middlewares = require('../middlewares/authencation')

router.get('/digital-certificate/trash',middlewares.checkAuthencation, controllerTrash.getTrash);
router.post('/digital-certificate/trash/:id/restore', controllerTrash.restore);
router.post('/digital-certificate/trash/:id/force-destroy', controllerTrash.destroy);
router.post('/digital-certificate/trash/:id/restoreOrg', controllerTrash.restoreOrg);
router.post('/digital-certificate/trash/:id/force-destroyOrg', controllerTrash.destroyOrg);


module.exports = router;