var SHA256 = require('./SHA256')

function HMAC (k) {
  var i, pad = new Uint8Array(64)
  if (k.length > 64) {
    (new SHA256()).update(k).finish(pad)
  } else {
    for (i = 0; i < k.length; i++) pad[i] = k[i]
  }
  this.inner = new SHA256()
  this.outer = new SHA256()
  for (i = 0; i < 64; i++) pad[i] ^= 0x36
  this.inner.update(pad)
  for (i = 0; i < 64; i++) pad[i] ^= 0x36 ^ 0x5c
  this.outer.update(pad)
  this.istate = new Uint32Array(8)
  this.ostate = new Uint32Array(8)
  for (i = 0; i < 8; i++) {
    this.istate[i] = this.inner.v[i]
    this.ostate[i] = this.outer.v[i]
  }
  for (i = 0; i < pad.length; i++) pad[i] = 0
}

HMAC.prototype.reset = function () {
  for (var i = 0; i < 8; i++) {
    this.inner.v[i] = this.istate[i]
    this.outer.v[i] = this.ostate[i]
  }
  this.inner.len = this.outer.len = 64
  this.inner.buflen = this.outer.buflen = 0
}

HMAC.prototype.clean = function () {
  for (var i = 0; i < 8; i++) this.ostate[i] = this.istate[i] = 0
  this.inner.clean()
  this.outer.clean()
}

HMAC.prototype.update = function (m) {
  this.inner.update(m)
  return this
}

HMAC.prototype.finish = function (h) {
  this.inner.finish(h)
  this.outer.update(h, 32).finish(h)
  return this
}

module.exports = HMAC
