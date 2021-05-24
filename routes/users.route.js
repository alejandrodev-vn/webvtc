const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/users.controller')
const middlewares = require('../middlewares/authencation')

router.get('/users/login', controllerUsers.test) //test
router.get('/abc', middlewares.checkAuthencation, (req, res) => {
    res.send('Helo user')
}) //test 2

router.post('/users/login', controllerUsers.login)
router.post('/users/add', controllerUsers.add)
router.put('/users/edit/:id', controllerUsers.update)
router.put('/users/change-password/:id', controllerUsers.changePassword)

module.exports = router;