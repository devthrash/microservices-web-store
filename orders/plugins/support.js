'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')
const {
    verify,
    decode
} = require('./../utils/jwt')

module.exports = fastifyPlugin(async function(fastify, options) {
    fastify.decorateRequest('verifyJwt', function() {
        const header = this.headers['authorization']

        if (!header) {
            throw new this.server.httpErrors.unauthorized('Token not provided')
        }

        if (!verify(header.split(' ')[1])) {
            throw new this.server.httpErrors.unauthorized()
        }
    })
    fastify.decorateRequest('decodeJwt', function() {
        return decode(this.headers['authorization'].split(' ')[1])
    })
})
