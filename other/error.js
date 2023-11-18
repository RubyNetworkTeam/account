const {create} = require('xmlbuilder2')
const {Error} = require("./logger")
/**
 * @typedef {Object} WiiUError
 * @property {string} code
 * @property {string} message
 */

/**
 * @param {WiiUError} options
 * @param {string} at 
 */
function xmlError(options, at){
    Error(`at ${at} | Code: ${options.code} | Message: ${options.message}`);
    return create({version: '1.0'})
        .ele('errors')
            .ele('error')
                .ele('code').txt(options.code)
                .up()
            .ele('message').txt(options.message)
            .up()
        .up()
        .up()
        .toString()
}

module.exports = {xmlError}