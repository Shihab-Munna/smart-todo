const db = require('../models');
const Sequelize = require('sequelize');
const { generateJWTToken } = require('../util/jwt');
const { passError } = require('../util/errorhandle');
const { validPassword } = require('../util/bcrypt');


exports.homePage = function (req, res) {
    res.json({
        message: `This is home page`
    })
}


exports.singUp = async (req, res, next) => {
    try {
        var matchedUser = await db.User.findAll({
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


        if (matchedUser.length == 0) {
            user = await db.User.create(req.body);
            const user_payload = {
                id: user.id,
                user_name: user.user_name
            };
            const token = generateJWTToken(user_payload);
            res.json({
                message: " User Created Successfuylly",
                token: token
            })
        } else {

            throw new passError(400, "User Already exist!");
        }

        

    } catch (err) {
        next(err);
    }
};

exports.logIn = async (req, res, next) => {
    try {
        var UserMatched = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });
        
        if (UserMatched.length != 0) {
            if (validPassword(req.body.password, UserMatched[0].password)) {
                var user = {
                    id: UserMatched[0].id,
                    user_name: UserMatched[0].user_name
                }
                var token = generateJWTToken(user);
                res.json({
                    message: "Login Successfull",
                    token: token
                })
            } else {

                throw new passError(400, "Invalid Password!");
            }
        } else {
            throw new passError(404, "No User Found!");
        }
      
    } catch (err) {
        next(err)
    }
};