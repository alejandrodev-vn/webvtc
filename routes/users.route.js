const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/users.controller')
const middlewares = require('../middlewares/authencation')


router.post('/users/login', controllerUsers.login)
router.get('/users/signup', controllerUsers.signup)
router.post('/users/signup', controllerUsers.add)
router.put('/users/edit/:id', middlewares.checkAuthencation, controllerUsers.update)
router.put('/users/change-password/:id', middlewares.checkAuthencation, controllerUsers.changePassword)

module.exports = router;