var express = require('express');
var router = express.Router();
var statusController = require('../controllers/status.controller')


router.get('/list', statusController.listStatus);
router.post('/update', statusController.updateStatus);
module.exports = router;
