import { Request, Response } from 'express';
export type ModuleMiddleware = (req: Request, res: Response) => Promise<void> | void;
export type ModuleMiddlewareFactory = (options?: any) => ModuleMiddleware;

