var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');
/* GET users listing. */
//    /users/  ===  /users, leading slash doesn't matter

router.get('/', userController.users);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// user prefix comes from: app.json -> app.use('/users', usersRouter);
//    localhost:3000/users/profile
// router.get('/profile', function (req, res, next) {
//   res.send('respond with a profile info');
// });


// localhost://5000/users/add-user

// router.post('/add-user', function(req, res, next){
//   //console.log(req.body);
//   user.push(req.body)
//   res.json({
//     message: `User Created as ${req.body.user_name}`,
//     data: req.body
//   });
// });

module.exports = router;