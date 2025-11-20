import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WinstonLogger implements LoggerService {
private logger: winston.Logger;


constructor(private config: ConfigService) {
const logFolder = this.config.get<string>('logging.folder') || 'logs';
const level = this.config.get<string>('logging.level') || 'info';
const rotation = this.config.get<any>('logging.rotation') || { maxFiles: '14d', maxSize: '20m' };


const rotateTransport = new DailyRotateFile({
filename: `${logFolder}/app-%DATE%.log`,
datePattern: 'YYYY-MM-DD',
zippedArchive: true,
maxFiles: rotation.maxFiles,
maxSize: rotation.maxSize,
level
});


this.logger = winston.createLogger({
level,
format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),
transports: [rotateTransport]
});


if (this.config.get('app.env') !== 'production') {
this.logger.add(new winston.transports.Console({
format: winston.format.combine(
winston.format.colorize(),
winston.format.printf((info: winston.Logform.TransformableInfo) => {
const timestamp = info.timestamp || new Date().toISOString();
return `${timestamp} [${info.level}] : ${info.message}`;
})
)
}));
}
}


log(message: string) { this.logger.info(message); }
error(message: string, trace?: string) { this.logger.error(message, { trace }); }
warn(message: string) { this.logger.warn(message); }
debug(message: string) { this.logger.debug(message); }
verbose(message: string) { this.logger.verbose(message); }
}