'use strict'

const jwt = require('jsonwebtoken')
const { jwtPrivateKey, jwtTTL } = require('./../config')

const sign = (sub, payload = {}) => {
    const opts = {
        issuer: 'users-service',
        subject: sub,
        expiresIn: jwtTTL,
        algorithm: 'RS256'
    };

    return jwt.sign(payload, jwtPrivateKey, opts);
}

module.exports = {
    sign
}
