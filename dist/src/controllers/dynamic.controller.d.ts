import { WorkflowService } from '../workflow/workflow.service';
import { ProxyService } from '../proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class DynamicController {
    private workflow;
    private proxy;
    private config;
    constructor(workflow: WorkflowService, proxy: ProxyService, config: ConfigService);
    handleAll(req: Request, res: Response): Promise<any>;
}
