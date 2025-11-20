import Ajv from 'ajv';
import { ModuleMiddlewareFactory } from './types';
import { Request, Response } from 'express';


const ajv = new Ajv();


export const ValidateSchemaFactory: ModuleMiddlewareFactory = (options = {}) => {
const schema = options.schema || { type: 'object' };
const validate = ajv.compile(schema);
return (req: Request, res: Response) => {
const valid = validate(req.body);
if (!valid) return res.status(400).json({ error: 'schema_validation_failed', details: validate.errors });
};
};