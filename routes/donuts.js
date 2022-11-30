const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const donutController = require('../controllers/donuts');

router.post('/', donutController.create);
router.put('/:id', passport.authenticate('jwt', {session: false}), donutController.updateDonutStatus);
router.delete('/:id', passport.authenticate('jwt', {session: false}), donutController.deleteDonut);
router.get('/', donutController.getDonuts);
router.get('/:datetime', donutController.getDonuts);
router.get('/:company', donutController.getDonuts);

module.exports = router;