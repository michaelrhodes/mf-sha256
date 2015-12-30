var SHA256 = require('./algo/SHA256')
var sha256 = new SHA256

module.exports = function (m) {
  var h = new Uint8Array(32)
  sha256.update(m).finish(h).clean()
  return h
}
