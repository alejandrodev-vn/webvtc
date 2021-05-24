const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/users.controller')

router.post('/users/add', controllerUsers.add);
router.put('/users/edit/:id', controllerUsers.update)
router.put('/users/change-password/:id', controllerUsers.changePassword)


module.exports = router;