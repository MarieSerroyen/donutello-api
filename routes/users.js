const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('./../passport/passport');

router.post('/', userController.create);
router.post('/login', userController.login);
router.put('/:id',passport.authenticate('jwt', {session: false}), userController.changePassword);

module.exports = router;