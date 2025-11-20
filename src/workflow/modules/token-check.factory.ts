import { ModuleMiddlewareFactory } from './types';
import { Request, Response } from 'express';


export const TokenCheckFactory: ModuleMiddlewareFactory = (options = {}) => {
const { header = 'x-api-key', validTokens = [] } = options;
return (req: Request, res: Response) => {
const token = req.header(header);
if (!token) return res.status(401).json({ error: 'token_missing' });
if (!validTokens.includes(token)) return res.status(403).json({ error: 'token_invalid' });
(req as any).apiToken = token;
};
};