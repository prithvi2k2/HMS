const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Hash a password
async function PwHash(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        console.log(`Failed to hash password\nERR: ${String(err)}`);
    }
}

// Verify a password
async function PwVerify(hash, password) {
    try {
        // password match
        if (await argon2.verify(hash, password)) return true;
        // password did not match
        return false;
    } catch (err) {
        // internal failure or any other error
        console.log(`Failed to verify password with hash\nERR: ${String(err)}`);
    }
}

// Generate JWT
function genJWT(payload, expiresIn) {
    // expiresIn is optional param if you want to increase/decrease validity time from default of 20mins
    return jwt.sign(payload, process.env.JWT, { expiresIn: expiresIn || '20m' })
}

// Verify JWT and return
function chkJWT(token) {
    try {
        return jwt.verify(token, process.env.JWT)
    }
    catch (err) {
        console.log(`Failed to verify JWT\nERR: ${String(err)}`)
    }
}

// PwHash('patient').then(p=>console.log(p))

export { PwHash, PwVerify, genJWT, chkJWT }