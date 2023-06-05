'use strict'

const config = require('./config')

const start = async () => {
    const app = await require('./app')()

    console.log(app.printRoutes())

    await app.listen({
        port: config.appPort,
        host: config.appHost
    })
}

start()
