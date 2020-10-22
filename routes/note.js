var express = require('express');
var router = express.Router();
const noteController = require('../controller/note-controller');


router.get("/", noteController.getNotes);
router.post("/", noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);


module.exports = router;