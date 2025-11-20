// -------------------------------
// file: src/workflow/modules/module-registry.ts
// -------------------------------
import { Injectable } from '@nestjs/common';
import { EnumCheckFactory } from './enum-check.factory';
import { JwtCheckFactory } from './jwt-check.factory';
import { SessionCheckFactory } from './session-check.factory';
import { TokenCheckFactory } from './token-check.factory';
import { ModuleMiddlewareFactory } from './types';
import { ValidateSchemaFactory } from './validate-schema.factory';



@Injectable()
export class ModuleFactoryRegistry {
private registry = new Map<string, ModuleMiddlewareFactory>();


constructor() {
this.register('validateSchema', ValidateSchemaFactory);
this.register('enumCheck', EnumCheckFactory);
this.register('tokenCheck', TokenCheckFactory);
this.register('jwtCheck', JwtCheckFactory);
this.register('sessionCheck', SessionCheckFactory);
}


register(name: string, factory: ModuleMiddlewareFactory) {
this.registry.set(name, factory);
}


get(name: string) {
return this.registry.get(name);
}
}