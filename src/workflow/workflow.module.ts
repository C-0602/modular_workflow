import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { ModuleFactoryRegistry } from './modules/module-registry';
import { DynamicController } from '../controllers/dynamic.controller';
import { ProxyModule } from '../proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProxyModule, ConfigModule.forRoot({ isGlobal: true })], 
  providers: [WorkflowService, ModuleFactoryRegistry],
  controllers: [DynamicController],
  exports: [WorkflowService]
})
export class WorkflowModule {}
