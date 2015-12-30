var HMAC = require('./algo/HMAC')

module.exports = function (k, m) {
  var h = new Uint8Array(32)
  new HMAC(k).update(m).finish(h).clean()
  return h
}
