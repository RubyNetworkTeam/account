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

async function generateToken(cryptoOptions, tokenOptions) {

	// Access and refresh tokens use a different format since they must be much smaller
	// They take no extra crypto options
	if (!cryptoOptions) {
		const aesKey = await cache.getServiceAESKey('account', 'hex');

		const dataBuffer = Buffer.alloc(1 + 1 + 4 + 8);

		dataBuffer.writeUInt8(tokenOptions.system_type, 0x0);
		dataBuffer.writeUInt8(tokenOptions.token_type, 0x1);
		dataBuffer.writeUInt32LE(tokenOptions.pid, 0x2);
		dataBuffer.writeBigUInt64LE(tokenOptions.expire_time, 0x6);

		const iv = Buffer.alloc(16);
		const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, iv);

		let encryptedBody = cipher.update(dataBuffer);
		encryptedBody = Buffer.concat([encryptedBody, cipher.final()]);

		return encryptedBody.toString('base64');
	}

	const publicKey = new NodeRSA(cryptoOptions.public_key, 'pkcs8-public-pem', {
		environment: 'browser',
		encryptionScheme: {
			'hash': 'sha256',
		}
	});

	// Create the buffer containing the token data
	const dataBuffer = Buffer.alloc(1 + 1 + 4 + 1 + 8 + 8);

	dataBuffer.writeUInt8(tokenOptions.system_type, 0x0);
	dataBuffer.writeUInt8(tokenOptions.token_type, 0x1);
	dataBuffer.writeUInt32LE(tokenOptions.pid, 0x2);
	dataBuffer.writeUInt8(tokenOptions.access_level, 0x6);
	dataBuffer.writeBigUInt64LE(tokenOptions.title_id, 0x7);
	dataBuffer.writeBigUInt64LE(tokenOptions.expire_time, 0xF);

	// Calculate the signature of the token body
	const hmac = crypto.createHmac('sha1', cryptoOptions.hmac_secret).update(dataBuffer);
	const signature = hmac.digest();

	// You can thank the 3DS for the shit thats about to happen with the AES IV
	// The 3DS only allows for strings up to 255 characters in NEX
	// So this is done to reduce the token size as much as possible
	// I am sorry, and have already asked every God I could think of for forgiveness

	// Generate random AES key
	const key = crypto.randomBytes(16);

	// Encrypt the AES key with RSA public key
	const encryptedKey = publicKey.encrypt(key);

	// Take two random points in the RSA encrypted key
	const point1 = ~~((encryptedKey.length - 8) * Math.random());
	const point2 = ~~((encryptedKey.length - 8) * Math.random());

	// Build an IV from each of the two points
	const iv = Buffer.concat([
		Buffer.from(encryptedKey.subarray(point1, point1 + 8)),
		Buffer.from(encryptedKey.subarray(point2, point2 + 8))
	]);

	const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);

	// Encrypt the token body with AES
	let encryptedBody = cipher.update(dataBuffer);
	encryptedBody = Buffer.concat([encryptedBody, cipher.final()]);

	// Create crypto config token section
	const cryptoConfig = Buffer.concat([
		encryptedKey,
		Buffer.from([point1, point2])
	]);

	// Build the token
	const token = Buffer.concat([
		cryptoConfig,
		signature,
		encryptedBody
	]);

	return token.toString('base64'); // Encode to base64 for transport
}

module.exports = { nintendoPasswordHash, generateToken }
