const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const donutController = require('../controllers/donuts');

router.post('/', donutController.create);
router.put('/:id', passport.authenticate('jwt', {session: false}), donutController.updateDonutStatus);

module.exports = router;