"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const module_registry_1 = require("./modules/module-registry");
let WorkflowService = class WorkflowService {
    config;
    registry;
    constructor(config, registry) {
        this.config = config;
        this.registry = registry;
    }
    buildPipelineForApi(apiKey) {
        const apis = this.config.get('apis');
        const api = apis?.[apiKey];
        if (!api)
            throw new common_1.BadRequestException('API not configured');
        const workflow = api.workflow || [];
        return workflow.map((step) => {
            const factory = this.registry.get(step.name);
            if (!factory)
                throw new common_1.InternalServerErrorException(`Module not found: ${step.name}`);
            return factory(step.options || {});
        });
    }
    async executePipeline(pipeline, req, res) {
        for (const mw of pipeline) {
            await new Promise((resolve, reject) => {
                try {
                    const out = mw(req, res);
                    if (out && typeof out.then === 'function') {
                        out.then(resolve).catch(reject);
                    }
                    else {
                        resolve();
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
            if (res.headersSent)
                return;
        }
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, module_registry_1.ModuleFactoryRegistry])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map