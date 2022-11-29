const express = require('express');
const router = express.Router();
const donutController = require('../controllers/donuts');

router.post('/', donutController.create);
router.put('/:id', donutController.updateDonutStatus);

module.exports = router;