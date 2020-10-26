var express = require('express');
var router = express.Router();
var indexControler = require('../controller/index-controller')

router.get('/', indexControler.homePage);
router.post('/signup', indexControler.singUp);
router.post('/login', indexControler.logIn);

module.exports = router;