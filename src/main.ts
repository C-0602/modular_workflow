import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from './logger/logger';


async function bootstrap() {
const app = await NestFactory.create(AppModule, { bufferLogs: true });
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
await app.listen(port);
const logger = app.get(WinstonLogger);
if (logger && typeof logger.log === 'function') logger.log(`Service started on port ${port}`);
}
bootstrap();