const { verifyJWTToken } = require('../util/jwt');
const { passError } = require('../util/errorhandle');


module.exports = (req, res, next) => {
    const token = req.headers.token;
    if(!token || token == null) throw new passError(401, "TOKEN MISSING");
    verifyJWTToken(token, req, res, next);
}