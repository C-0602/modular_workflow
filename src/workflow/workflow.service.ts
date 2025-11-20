import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleFactoryRegistry } from './modules/module-registry';
import { Request, Response } from 'express';


@Injectable()
export class WorkflowService {
constructor(private config: ConfigService, private registry: ModuleFactoryRegistry) {}


buildPipelineForApi(apiKey: string) {
const apis = this.config.get('apis');
const api = apis?.[apiKey];
if (!api) throw new BadRequestException('API not configured');
const workflow = api.workflow || [];
return workflow.map((step: any) => {
const factory = this.registry.get(step.name);
if (!factory) throw new InternalServerErrorException(`Module not found: ${step.name}`);
return factory(step.options || {});
});
}


async executePipeline(pipeline: Array<(req: Request, res: Response) => Promise<void> | void>, req: Request, res: Response) {
for (const mw of pipeline) {
await new Promise<void>((resolve, reject) => {
try {
const out = mw(req, res);
if (out && typeof (out as any).then === 'function') {
(out as any).then(resolve).catch(reject);
} else {
resolve();
}
} catch (err) { reject(err); }
});
if (res.headersSent) return;
}
}
}