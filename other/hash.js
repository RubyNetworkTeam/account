const crypto = require('crypto');
/**
 * @author Pretendo Network Team
 * @param {string} password 
 * @param {number} pid 
 * @returns {string} hashed password
 */
function nintendoPasswordHash(password, pid) {
    const pidBuffer = Buffer.alloc(4);
    pidBuffer.writeUInt32LE(pid);

    const unpacked = Buffer.concat([
        pidBuffer,
        Buffer.from('\x02\x65\x43\x46'),
        Buffer.from(password)
    ]);
    const hashed = crypto.createHash('sha256').update(unpacked).digest().toString('hex');

    return hashed;
}

module.exports = { nintendoPasswordHash }