const db = require('../models')
const d = new Date();

exports.getNotes = function(req, res){
  db.Note.findAll().then(notes => {
      res.json({
          message: "All Notes",
          body: notes
      })
  })
  .catch(err => {
      res.status(500).json({
          message: "Error",
          body: err
      })
  })
};


exports.createNote = function(req, res){
    db.Note.create({
        note_title: req.body.note_title,
        note_status: req.body.note_status,
        createdAt: d,
        updatedAt: d,
        UserId: req.body.userId
    }).then(result => {
        res.json({
            message: "Note Created!!"
        })
    })
    .catch(err => {
        res.json({
            message: "Note Not Created: Error!",
            body: err
        })
    })
} 

exports.updateNote = function(req, res){
    db.Note.update({
        note_title: req.body.note_title,
        note_status: req.body.note_status,
        updatedAt: d,

        
    },{
        where : {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Note Updated!!",
        })

    }).catch( err => {
        res.status(500).json({
            message: "Something went wrong: Error",
            body: err
        })
    })
}

exports.deleteNote = function(req, res){
    db.Note.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Note deleted Successfully"
        })
    }).catch( err => {
        res.status(500).json({
            message: "Unable to delete the Note",
            body: err
        })
    })
}


