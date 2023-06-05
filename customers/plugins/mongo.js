'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')

const config = require('./../config')

module.exports = fastifyPlugin(async function(fastify, options) {
    await fastify.register(require('@fastify/mongodb'), {
        url: config.mongoConnectionString,
        useNewUrlParser: true
    })

    await require('./../utils/customer').createIndexes(fastify.mongo)
})
