# mf-sha256

A modular fork of [dchest/fast-sha256](https://github.com/dchest/fast-sha256-js), because sometimes you don’t want the kitchen sink.

[![Build status](https://travis-ci.org/michaelrhodes/mf-sha256.svg?branch=master)](https://travis-ci.org/michaelrhodes/mf-sha256)

## Install

```sh
$ npm install mf-sha256
```

## Usage

As described at [dchest/fast-sha256#usage](https://github.com/dchest/fast-sha256-js#usage) but with each function required separately.

```js
var sha256 = require('mf-sha256')
var hmac = require('mf-sha256/hmac')
var pbkdf2 = require('mf-sha256/pbkdf2')
```

# Page weight (just for the hash function)

| compression         |    size |
| :------------------ | ------: |
| mf-sha256.js        | 4.99 kB |
| mf-sha256.min.js    | 3.34 kB |
| mf-sha256.min.js.gz | 1.56 kB |


## License

Public domain. No warranty.
