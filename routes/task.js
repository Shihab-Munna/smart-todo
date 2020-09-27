var express = require('express');
var router = express.Router();
var taskController = require('../controller/task-controller');

router.get('/',taskController.tasks);
router.post('/',taskController.addTask);
router.put('/:id',taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
