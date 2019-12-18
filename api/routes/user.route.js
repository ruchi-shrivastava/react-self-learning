const express = require('express');

const userController = require('../controllers/user.controller')

const router = new express.Router();

router.route('/addUser').post(userController.AddUser);
router.route('/login').post(userController.LoginUser)

module.exports = router;