import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';
import { WinstonLogger } from './logger/logger';
import { ProxyModule } from './proxy/proxy.module';
import { WorkflowModule } from './workflow/workflow.module';



@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
CacheModule.register({ isGlobal: true }),
WorkflowModule,
ProxyModule
],
providers: [WinstonLogger],
exports: [WinstonLogger]
})
export class AppModule {}