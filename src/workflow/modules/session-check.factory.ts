import { ModuleMiddlewareFactory } from './types';
import { Request, Response } from 'express';


export const SessionCheckFactory: ModuleMiddlewareFactory = (options = {}) => {
const { cookieName = 'sid' } = options;
return (req: Request, res: Response) => {
const cookies = (req.headers['cookie'] || '').split(';').map(c => c.trim()).filter(Boolean);
const parsed = cookies.map(c => c.split('=')).reduce<Record<string,string>>((acc, pair) => { acc[pair[0]] = pair[1]; return acc; }, {});
if (!parsed[cookieName]) return res.status(401).json({ error: 'session_missing' });
(req as any).sessionId = parsed[cookieName];
};
};

