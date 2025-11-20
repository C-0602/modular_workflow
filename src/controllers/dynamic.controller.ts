import { Controller, All, Req, Res } from '@nestjs/common';
import { WorkflowService } from '../workflow/workflow.service';
import { ProxyService } from '../proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';


@Controller()
export class DynamicController {
constructor(private workflow: WorkflowService, private proxy: ProxyService, private config: ConfigService) {}


@All('*')
async handleAll(@Req() req: Request, @Res() res: Response) {
const path = req.path;
const apis = this.config.get('apis');
const matchedKey = Object.keys(apis).find(k => apis[k].path === path);
if (!matchedKey) return res.status(404).json({ error: 'not_found' });


const pipeline = this.workflow.buildPipelineForApi(matchedKey);
await this.workflow.executePipeline(pipeline, req, res);
if (res.headersSent) return;


const forwarded = await this.proxy.forward(req);
Object.entries(forwarded.headers || {}).forEach(([k, v]) => { try { res.setHeader(k, v as any); } catch (e) {} });
res.status(forwarded.status).send(forwarded.data);
}
}