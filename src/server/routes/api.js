var express = require('express');
var router = express.Router();

var apiController = require('../controller/api');
var userController = require('../controller/api/user');
var adminController = require('../controller/api/admin');
var articleController = require('../controller/api/article');
var regionController = require('../controller/api/region');

/* GET users listing. */
router.get('/test', apiController.test);
router.get('/user/find', userController.find);

router.post('/admin/login', adminController.login);
router.get('/admin/logout', adminController.logout);

router.get('/api/region',regionController.getRegionData);
router.post('/article/add', articleController.add);
router.get('/article/del', articleController.del);
router.post('/article/update', articleController.update);
router.get('/article/find', articleController.find);
router.get('/article/findById', articleController.findById);

module.exports = router;
