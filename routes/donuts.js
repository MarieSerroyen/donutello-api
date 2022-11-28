const express = require('express');
const router = express.Router();
const donutController = require('../controllers/donuts');

router.post('/', donutController.create);

module.exports = router;