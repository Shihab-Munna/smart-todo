const db = require('../models')
const d = new Date();
const Sequelize = require('sequelize');
exports.getNotes = function (req, res) {
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


exports.createNote = function (req, res) {
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

exports.updateNote = function (req, res) {
    db.Note.update({
        note_title: req.body.note_title,
        note_status: req.body.note_status,
        updatedAt: d,


    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Note Updated!!",
        })

    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong: Error",
            body: err
        })
    })
}

exports.deleteNote = function (req, res) {
    db.Note.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Note deleted Successfully"
        })
    }).catch(err => {
        res.status(500).json({
            message: "Unable to delete the Note",
            body: err
        })
    })
}

exports.searchNote = function (req, res) {
    db.Note.findAll({
        where: {
            [Sequelize.Op.and]: [{
                    "note_title": {
                        [Sequelize.Op.like]: '%' + req.body.search + '%'
                    }
                },
                {
                    "UserId": req.params.id
                }
            ]
        }
    }).then(notes => {
        if (notes.length != 0) {
            res.json({
                message: `Note Matched with: ${req.body.search}`,
                body: notes
            });
        } else {
            res.json({
                message: `No Note Matched with: ${req.body.search}`
            });
        }

    }).catch(err => {
        console.log(err);
    })
}

exports.CreateShareLink = function (req, res) {
    res.json({
        message: `Share This Link: http://localhost:5000/note/find/${req.params.id}`,
    })
};


exports.find = function (req, res) {
    db.Note.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.Task
        }]
    }).then(note => {
        res.json({
            message: `Note: ${note.note_title} || status : ${note.note_status}`,
            body: note.Tasks
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something Went Wrong ',
            body: err
        })
    })
}