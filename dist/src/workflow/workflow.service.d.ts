import { ConfigService } from '@nestjs/config';
import { ModuleFactoryRegistry } from './modules/module-registry';
import { Request, Response } from 'express';
export declare class WorkflowService {
    private config;
    private registry;
    constructor(config: ConfigService, registry: ModuleFactoryRegistry);
    buildPipelineForApi(apiKey: string): any;
    executePipeline(pipeline: Array<(req: Request, res: Response) => Promise<void> | void>, req: Request, res: Response): Promise<void>;
}
