"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCheckFactory = void 0;
const EnumCheckFactory = (options = {}) => {
    const { field, allowed = [] } = options;
    return (req, res) => {
        const value = req.body?.[field] ?? req.query?.[field] ?? req.headers[field?.toLowerCase()];
        if (value === undefined)
            return res.status(400).json({ error: 'enum_field_missing', field });
        if (!allowed.includes(value))
            return res.status(400).json({ error: 'enum_check_failed', field, allowed });
    };
};
exports.EnumCheckFactory = EnumCheckFactory;
//# sourceMappingURL=enum-check.factory.js.map