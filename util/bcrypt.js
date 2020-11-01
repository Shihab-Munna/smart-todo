const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hashSync(password, 10);
} 

const validPassword = (password, hashPass) => {
    return bcrypt.compareSync(password, hashPass);
}

module.exports = {
    generateHash: generateHash,
    validPassword: validPassword
}