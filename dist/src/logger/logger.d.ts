import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class WinstonLogger implements LoggerService {
    private config;
    private logger;
    constructor(config: ConfigService);
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
