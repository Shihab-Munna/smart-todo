var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');

router.get('/', userController.users);
router.get('/:id', userController.particularUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;