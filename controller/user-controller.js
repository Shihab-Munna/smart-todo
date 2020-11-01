const db = require('../models');
const d = new Date();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {
    passError
} = require('../util/errorhandle');

// get all the users 
exports.users = async (req, res, next) => {
    try {
        var users = await db.User.findAll();

        if (users.length) {
            res.json({
                message: "All Users!",
                Users: users
            })
        } else {
            throw new passError(404, "No User Found!")
        }

    } catch (err) {
        next(err)
    }
};

// Update a user 
exports.updateUser = async (req, res, next) => {
    try {
        console.log(req.params.id);
        var user = await db.User.findAll({
            where: {
                id: req.params.id
            }
        });
        if (user.length != 0) {
            await db.User.update({
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password,
                updatedAt: d
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                message: "User Updated"
            })
        } else {

            throw new passError(404, "No User Found!");
        }
        next()

    } catch (error) {
        next(error)
    }
};

// Delete a user 
exports.deleteUser = async (req, res, next) => {
    try {
        var user = await db.User.findAll({
            where: {
                id: req.params.id
            }
        });
        if (user.length != 0) {
            await db.User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                message: "Deleted User Successfully"
            })
        } else {

            throw new passError(400, "No User Found!");
        }

        next()
    } catch (error) {
        next(error);
    }
};

//get Notes and tasks of a particuler user
exports.particularUser = async (req, res, next) => {

    try {
        var alldata = await db.User.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Note,
                include: [{
                    model: db.Task
                }]
            }],
        });


        if (alldata.length != 0) {
            res.json({
                message: `Welcome ${alldata[0].user_name}`,
                User_with_Notes_and_Tasks: alldata
            })
        } else {
            throw new passError(400, "No User Found!");
        }

        next();

    } catch (error) {
        next(error);
    }
};

// get all task of a particular user
exports.alltasks = async (req, res, next) => {
    try {
        var alldata = await db.User.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Note,
                include: [{
                    model: db.Task
                }]
            }],
        });

        if (alldata.length != 0) {
            var task = []
            for (var i = 0; i < alldata[0].Notes.length; i++) {
                task[i] = alldata[0].Notes[i].Tasks;
            }
            if (task.length != 0) {
                res.json({
                    message: `All Task for ${alldata[0].user_name}`,
                    tasks: task
                })
            }
            //console.log(task);
            else {

                throw new passError(404, "No Task Found ");
            }

        } else {
            throw new passError(404, "No Such User!");
        }


        next();

    } catch (error) {
        next(error);
    }

}
//get all notes of a perticuler user 
exports.notes = async (req, res, next) => {
    try {
        var alldata = await db.User.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Note,
            }],
        });

        if (alldata.length != 0) {
            if (alldata[0].Notes.length != 0) {
                res.json({
                    message: `All Notes For user ${alldata[0].user_name}`,
                    notes: alldata[0].Notes
                })
            } else {
                throw new passError(404, "No Notes Found!")
            }
        } else {
            throw new passError(404, "No Such User")
        }

        next()
    } catch (error) {
        next(error)
    }
}