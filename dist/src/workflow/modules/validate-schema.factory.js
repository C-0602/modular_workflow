"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSchemaFactory = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const ValidateSchemaFactory = (options = {}) => {
    const schema = options.schema || { type: 'object' };
    const validate = ajv.compile(schema);
    return (req, res) => {
        const valid = validate(req.body);
        if (!valid)
            return res.status(400).json({ error: 'schema_validation_failed', details: validate.errors });
    };
};
exports.ValidateSchemaFactory = ValidateSchemaFactory;
//# sourceMappingURL=validate-schema.factory.js.map