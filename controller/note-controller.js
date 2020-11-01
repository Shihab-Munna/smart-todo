const db = require('../models')
const d = new Date();
const Sequelize = require('sequelize');
const { passError } = require('../util/errorhandle');


exports.getNotes = async (req, res, next) => {
    try {
        var notes = await db.Note.findAll();

        if (notes.length) {
            res.json({
                message: "All Notes!",
                Notes: notes
            })
        } else {
            throw new passError(404, "No Notes Found!")
        }

        // next()

    } catch (err) {
        next(err)
    }
};


exports.createNote = async (req, res, next) => {
    try {
        var note = await db.Note.create(req.body)
        res.json({
            message: "Note Created!!",
            Note: note
        })
        // next()
    } catch (error) {
        next(error);
    }
}

exports.updateNote = async (req, res, next) => {
    try {
        var note = await db.Note.findAll({
            where: {
                id: req.params.id
            }
        });
        if (note.length) {
            await db.Note.update({
                note_title: req.body.note_title,
                note_status: req.body.note_status,
                updatedAt: d,
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                message: "Note Updated Successfully",
            });
        } else {

            throw new passError(400, "No Such Note!");
        }

        // next()
    } catch (error) {
        next(error);
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        var note = await db.Note.findAll({
            where: {
                id: req.params.id
            }
        });
        if (note.length) {
            await db.Note.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                message: "Note Deleted Successfully"
            })
        } else {
            throw new passError(400, "No Such Note");
        }
        // next();
    } catch (error) {
        next(error);
    }
}


exports.searchNote = async (req, res, next) => {
    try {
        searchResult = await db.Note.findAll({
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
        });

        if (searchResult.length) {
            res.json({
                message: `Note Matched with: ${req.body.search}`,
                searchResult: searchResult
            })
        } else {
            throw new passError(404, `No Note Matched with: ${req.body.search}`)
        }

        // next()
    } catch (error) {
        next(error)
    }
}

exports.CreateShareLink = async (req, res, next) => {
    try {
        res.json({
            Shareable_link: `Share This Link: http://localhost:5000/note/find/${req.params.id}`,
        })

      
    } catch (error) {
        next(error);
    }

};


exports.find = async (req, res, next) => {

    try {
        note = await db.Note.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Task
            }]
        })
        if (note.length) {
            res.json({
                message: `Note: ${note[0].note_title} || status : ${note[0].note_status}`,
                Note_And_Task: note
            });
        } else {

            throw new passError(404, "No Data Found!!");
        }

        next()


    } catch (error) {
        next(error);

    }
}