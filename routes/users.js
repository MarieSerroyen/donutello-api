const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;