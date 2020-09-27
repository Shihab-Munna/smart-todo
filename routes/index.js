var express = require('express');
var router = express.Router();
var indexControler = require('../controller/index-controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: "Login Page" 
  })
});

router.get('/note/:note_id/task/:task_id', indexControler.particularTask);

module.exports = router;
