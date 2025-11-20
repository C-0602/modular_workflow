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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicController = void 0;
const common_1 = require("@nestjs/common");
const workflow_service_1 = require("../workflow/workflow.service");
const proxy_service_1 = require("../proxy/proxy.service");
const config_1 = require("@nestjs/config");
const express_1 = require("express");
let DynamicController = class DynamicController {
    workflow;
    proxy;
    config;
    constructor(workflow, proxy, config) {
        this.workflow = workflow;
        this.proxy = proxy;
        this.config = config;
    }
    async handleAll(req, res) {
        const path = req.path;
        const apis = this.config.get('apis');
        const matchedKey = Object.keys(apis).find(k => apis[k].path === path);
        if (!matchedKey)
            return res.status(404).json({ error: 'not_found' });
        const pipeline = this.workflow.buildPipelineForApi(matchedKey);
        await this.workflow.executePipeline(pipeline, req, res);
        if (res.headersSent)
            return;
        const forwarded = await this.proxy.forward(req);
        Object.entries(forwarded.headers || {}).forEach(([k, v]) => { try {
            res.setHeader(k, v);
        }
        catch (e) { } });
        res.status(forwarded.status).send(forwarded.data);
    }
};
exports.DynamicController = DynamicController;
__decorate([
    (0, common_1.All)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DynamicController.prototype, "handleAll", null);
exports.DynamicController = DynamicController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [workflow_service_1.WorkflowService, proxy_service_1.ProxyService, config_1.ConfigService])
], DynamicController);
//# sourceMappingURL=dynamic.controller.js.map