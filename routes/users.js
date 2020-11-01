var express = require('express');
var router = express.Router();
const userController = require('../controller/user-controller');
const authenticate = require('../middleware/authenticate.middleware');
// Public Routes  
router.get('/', userController.users);

// Privet routes 
router.use(authenticate);
router.get('/:id', userController.particularUser);
router.get('/:id/tasks', userController.alltasks);
router.get('/:id/notes', userController.notes);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;