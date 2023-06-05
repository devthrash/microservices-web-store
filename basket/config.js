'use strict'

const config = {}

config.redis = {
    host: process.env.REDIS_HOST || 'localhost'
}
config.amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672'

if (process.env.NODE_ENV !== 'production') {
    // use pino pretty only in development
    config.fastifyLogger = {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    }
} else {
    config.fastifyLogger = true
}

config.appPort = process.env.APP_PORT || 9002
config.appHost = '0.0.0.0'

// after this time the basket is deleted
config.basketTTL = 1209600 // 14 days

config.jwtPublicKey = Buffer.from(process.env.JWT_PUBLIC_KEY , 'base64').toString('utf-8')

module.exports = config
