const db = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

exports.homePage = function (req, res) {
    res.json({
        message: `This is home page`
    })
}

exports.singUp = function (req, res) {
    var matched_users = db.User.findAll({
        where: {
            [Sequelize.Op.or]: [{
                    "user_name": req.body.user_name
                },
                {
                    "email": req.body.email
                }
            ]
        }
    });

    matched_users.then(users => {
        if (users.length == 0) {
            const passwordHash = bcrypt.hashSync(req.body.password, 10);
            console.log(passwordHash);
            db.User.create({
                    user_name: req.body.user_name,
                    email: req.body.email,
                    password: passwordHash
                }).then(user => {
                    let url = `users/${user.id}`
                    res.redirect(url)
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Error",
                        body: err
                    })
                })
        } else {
            res.status(400).json({
                message: `Username or Email already in user!!`
            })
        }
    })
};

exports.logIn = function (req, res) {
    var UserMatched = db.User.findAll({
        where: {
            email: req.body.email
        }
    });

    UserMatched.then(users => {
        if (users.length != 0) {
            let user = users[0];
            let hashPass = user.password;
            if (bcrypt.compareSync(req.body.password, hashPass)) {
                let url = `users/${user.id}`
                res.redirect(url)

            } else {
                res.json({
                    message: "Wrong Password!!"
                })
            }
        } else {
            res.json({
                message: "Wrong Email! No user for this email"
            })
        }
    })

};