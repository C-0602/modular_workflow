"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = void 0;
const common_1 = require("@nestjs/common");
const workflow_service_1 = require("./workflow.service");
const module_registry_1 = require("./modules/module-registry");
const dynamic_controller_1 = require("../controllers/dynamic.controller");
const proxy_module_1 = require("../proxy/proxy.module");
const config_1 = require("@nestjs/config");
let WorkflowModule = class WorkflowModule {
};
exports.WorkflowModule = WorkflowModule;
exports.WorkflowModule = WorkflowModule = __decorate([
    (0, common_1.Module)({
        imports: [proxy_module_1.ProxyModule, config_1.ConfigModule.forRoot({ isGlobal: true })],
        providers: [workflow_service_1.WorkflowService, module_registry_1.ModuleFactoryRegistry],
        controllers: [dynamic_controller_1.DynamicController],
        exports: [workflow_service_1.WorkflowService]
    })
], WorkflowModule);
//# sourceMappingURL=workflow.module.js.map