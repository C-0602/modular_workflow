"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const logger_1 = require("./logger/logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const port = process.env.PORT ? Number(process.env.PORT) : 8080;
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(port);
    const logger = app.get(logger_1.WinstonLogger);
    if (logger && typeof logger.log === 'function')
        logger.log(`Service started on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map