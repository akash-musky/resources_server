'use-strict'


const crypto = require('crypto')

const rootRequire = (file, callback) => {
    const path = __dirname + file
    return callback(path)
}


const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length) // trim to desired length
}

module.exports = {
    rootRequire,
    generateRandomString
}