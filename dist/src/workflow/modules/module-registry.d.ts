import { ModuleMiddlewareFactory } from './types';
export declare class ModuleFactoryRegistry {
    private registry;
    constructor();
    register(name: string, factory: ModuleMiddlewareFactory): void;
    get(name: string): ModuleMiddlewareFactory | undefined;
}
