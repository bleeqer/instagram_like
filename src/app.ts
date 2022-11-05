import express, {Application, Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import {config} from './config/config'
import logger from './logger/Logger'
import authorRoutes from './routes/Author'

const app: Application = express()


/* Connect to MongoDB */
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {
    logger.info('Connected to mongoDB')
    startServer()
})
.catch((error) => {
    logger.error(`Unable to connect: ${error}`)
})

/* Only start the server if Mongo Connects */
const startServer = () => {

    app.use((req, res, next) => {
    
        /* Log the request */
        logger.info(`Incoming -> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)
        
        res.on('finish', () => {
            /* Log the response */
            logger.info(`Incoming -> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
        })

        next()
    })

    // app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    /* Routes */
    app.use('/authors', authorRoutes)

    app.listen(config.server.port, () => {logger.info(`Server started on port ${config.server.port}`)})
}