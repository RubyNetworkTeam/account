const { hashSync, genSaltSync, compareSync } = require('bcrypt')

function hashPassword(password) {
    const salts = genSaltSync(10);

}