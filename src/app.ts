import express, {Application, Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import {config} from './config/config'
import logger from './logger/Logger'

const router: Application = express()


/* Connect to MongoDB */
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {
    logger.info('Connected to mongoDB')
    startServer()
})
.catch((error) => {
    logger.error('Unable to connect: ')
    logger.error(error)
})

/* Only start the server if Mongo Connects */
const startServer = () => {

    router.use((req, res, next) => {
    
        /* Log the request */
        logger.info(`Incoming -> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)
        
        res.on('finish', () => {
            /* Log the response */
            logger.info(`Incoming -> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
        })

        next()
    })

    // router.use(express.urlencoded({extended: true}))
    router.use(express.json())
}