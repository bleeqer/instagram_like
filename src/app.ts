import express, {Application, Request, Response, NextFunction} from 'express'
import log from './logger'
import mongoose from 'mongoose'
import {config} from './config/config'

mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {
    log.info('connected')
})
.catch((error) => {
    console.log(error)
})

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    log.info('server running')
})

app.listen(config.server.port)