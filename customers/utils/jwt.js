'use strict'

const jwt = require('jsonwebtoken')
const { jwtPublicKey } = require('./../config')

const verify = (token) => {
    try {
        return jwt.verify(token, jwtPublicKey);
    } catch (err) {
        return false;
    }
}

const decode = (token) => {
    return jwt.decode(token)
}

module.exports = {
    verify,
    decode
}
