const db = require('../models');
const d = new Date();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

exports.users = function (req, res) {
    db.User.findAll().then(users => {
            res.json({
                message: "All Users!",
                body: users
            })
        })
        .catch(err => {
            res.staus(500).json({
                message: "Something Went Wrong",
                body: err
            })
        })
};

exports.createUser = function (req, res) {
    db.User.findAll({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user.length) {
                db.User.create({
                        user_name: req.body.user_name,
                        email: req.body.email,
                        createdAt: d,
                        updatedAt: d
                    }).then(result => {
                        res.json({
                            message: `Welcome ${req.body.user_name}!`
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: "Error!",
                            body: err
                        })
                    })

            } else {
                res.status(400).json({
                    message: "This email already been Used Once"
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                message: "Something Went Wrong!",
                body: err
            })
        })

};


exports.updateUser = function (req, res) {
    db.User.findAll({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (user.length != 0) {
                db.User.update({
                        user_name: req.body.user_name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        updatedAt: d
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(result => {
                        res.json({
                            message: `${req.body.user_name}:Your profile updated Successfully`
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: "Bad request!",
                            body: err
                        })
                    })
            } else {
                res.status(400).json({
                    message: "No such User"
                })

            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error",
                body: err
            })
        })

};

exports.deleteUser = function (req, res) {
    db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json({
                message: "User Removed Successfully!"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong!",
                body: err
            })
        })
};


exports.particularUser = function (req, res) {
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.Note,
            include: [{
                model: db.Task
            }]
        }],
    }).then(user => {
        var id = req.params.id;
        console.log(id);
        res.json({
            message: `Welcome ${user.user_name}`,
            body: user
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error",
            body: err
        })
    })
}