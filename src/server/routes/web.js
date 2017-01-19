var express = require('express');
var router = express.Router();

var webController = require('../controller/web');

/* GET users listing. */
router.get('/', webController.index);
router.get('/login', webController.login);
router.get('/manager', webController.manager);

module.exports = router;
