'use strict';

const autoload = require('@fastify/autoload')
const path = require('path')
const config = require('./config')

module.exports = function () {
    const fastify = require('fastify')({
        logger: config.fastifyLogger
    })

    fastify.register(require('@fastify/sensible'))

    // register plugins
    fastify.register(autoload, {
        dir: path.join(__dirname, 'plugins')
    })

    // register routes
    fastify.register(autoload, {
        dir: path.join(__dirname, 'routes')
    })

    return fastify;
}
