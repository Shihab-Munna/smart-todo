var express = require('express');
var router = express.Router();
const noteController = require('../controller/note-controller');


router.get("/", noteController.getNotes);
router.post("/", noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.get('/:id', noteController.searchNote);
router.get('/share/:id', noteController.CreateShareLink);
router.get('/find/:id', noteController.find);


module.exports = router;