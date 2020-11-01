var express = require('express');
var router = express.Router();
const noteController = require('../controller/note-controller');
const authenticate = require('../middleware/authenticate.middleware');

router.get("/", noteController.getNotes);
router.get('/find/:id', noteController.find);

router.use(authenticate);
router.post("/", noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.get('/:id', noteController.searchNote);
router.get('/share/:id', noteController.CreateShareLink);


module.exports = router;