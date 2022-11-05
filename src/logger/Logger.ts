import winston, {createLogger} from "winston"

const myFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}:${info.message}`)
)

const logger = createLogger({
    level: 'info',
    format: myFormat,
    transports: [
        new winston.transports.Console()
    ]
})
export default logger
