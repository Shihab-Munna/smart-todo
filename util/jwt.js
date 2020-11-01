const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ErrorHandler } = require('../util/errorhandle');
const { passError } = require('../util/errorhandle');
dotenv.config();
process.env.TOKEN_SECRET;

const generateJWTToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '300s' });
};

const verifyJWTToken = (token, req, res, next) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            throw new passError(403, 'Invalid Token!');
        }
        req.user = user
        next()
    })
}

module.exports = {
    generateJWTToken: generateJWTToken,
    verifyJWTToken: verifyJWTToken
}