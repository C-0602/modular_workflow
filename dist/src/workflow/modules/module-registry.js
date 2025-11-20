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
exports.ModuleFactoryRegistry = void 0;
const common_1 = require("@nestjs/common");
const enum_check_factory_1 = require("./enum-check.factory");
const jwt_check_factory_1 = require("./jwt-check.factory");
const session_check_factory_1 = require("./session-check.factory");
const token_check_factory_1 = require("./token-check.factory");
const validate_schema_factory_1 = require("./validate-schema.factory");
let ModuleFactoryRegistry = class ModuleFactoryRegistry {
    registry = new Map();
    constructor() {
        this.register('validateSchema', validate_schema_factory_1.ValidateSchemaFactory);
        this.register('enumCheck', enum_check_factory_1.EnumCheckFactory);
        this.register('tokenCheck', token_check_factory_1.TokenCheckFactory);
        this.register('jwtCheck', jwt_check_factory_1.JwtCheckFactory);
        this.register('sessionCheck', session_check_factory_1.SessionCheckFactory);
    }
    register(name, factory) {
        this.registry.set(name, factory);
    }
    get(name) {
        return this.registry.get(name);
    }
};
exports.ModuleFactoryRegistry = ModuleFactoryRegistry;
exports.ModuleFactoryRegistry = ModuleFactoryRegistry = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ModuleFactoryRegistry);
//# sourceMappingURL=module-registry.js.map