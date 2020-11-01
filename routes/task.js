var express = require('express');
var router = express.Router();
var taskController = require('../controller/task-controller');
var authenticate = require('../middleware/authenticate.middleware');

// public Routes
router.get('/', taskController.allTasks);

//Privet Routes
router.use(authenticate);

router.post('/', taskController.addTask);
router.put('/:id', taskController.updateTask);
router.get('/:id/note', taskController.noteOfTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;