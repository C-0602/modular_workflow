import { ModuleMiddlewareFactory } from './types';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const JwtCheckFactory: ModuleMiddlewareFactory = (options = {}) => {
const { header = 'authorization', secret = '' } = options;
return (req: Request, res: Response) => {
const hdr = req.header(header);
if (!hdr) return res.status(401).json({ error: 'authorization_header_missing' });
const parts = hdr.split(' ');
const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : hdr;
try {
const payload = jwt.verify(token, secret);
(req as any).jwt = payload;
} catch (err: any) {
return res.status(401).json({ error: 'jwt_invalid', message: err.message });
}
};
};