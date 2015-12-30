var HMAC = require('./algo/HMAC')

module.exports = function (password, salt, rounds, dkLen) {
  var i, j, k,
    ctr = new Uint8Array(4),
    t = new Uint8Array(32),
    u = new Uint8Array(32),
    dk = new Uint8Array(dkLen),
    prf = new HMAC(password)

  for (i = 0; i * 32 < dkLen; i++) {
    k = i + 1
    ctr[0] = (k >>> 24) & 0xff
    ctr[1] = (k >>> 16) & 0xff
    ctr[2] = (k >>> 8) & 0xff
    ctr[3] = (k >>> 0) & 0xff
    prf.reset()
    prf.update(salt)
    prf.update(ctr)
    prf.finish(u)
    for (j = 0; j < 32; j++) t[j] = u[j]
    for (j = 2; j <= rounds; j++) {
      prf.reset()
      prf.update(u).finish(u)
      for (k = 0; k < 32; k++) t[k] ^= u[k]
    }
    for (j = 0; j < 32 && i * 32 + j < dkLen; j++) dk[i * 32 + j] = t[j]
  }
  for (i = 0; i < 32; i++) t[i] = u[i] = 0
  for (i = 0; i < 4; i++) ctr[i] = 0
  prf.clean()
  return dk
}
