/*
 * SHA-256 (+ HMAC and PBKDF2) in JavaScript.
 * Written in 2014 by Dmitry Chestnykh.
 * Public domain, no warranty.
 *
 * Functions (accept and return Uint8Arrays):
 *
 *   sha256(message) -> hash
 *   sha256.hmac(key, message) -> mac
 *   sha256.pbkdf2(password, salt, rounds, dkLen) -> dk
 *
 */

module.exports = require('./index')
module.exports.hmac = require('./hmac')
module.exports.pbkdf2 = require('./pdkdf2')
