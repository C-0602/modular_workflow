import { ModuleMiddlewareFactory } from './types';
import { Request, Response } from 'express';


export const EnumCheckFactory: ModuleMiddlewareFactory = (options = {}) => {
const { field, allowed = [] } = options;
return (req: Request, res: Response) => {
const value = req.body?.[field] ?? req.query?.[field] ?? req.headers[field?.toLowerCase() as string];
if (value === undefined) return res.status(400).json({ error: 'enum_field_missing', field });
if (!allowed.includes(value)) return res.status(400).json({ error: 'enum_check_failed', field, allowed });
};
};

