"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCheckFactory = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtCheckFactory = (options = {}) => {
    const { header = 'authorization', secret = '' } = options;
    return (req, res) => {
        const hdr = req.header(header);
        if (!hdr)
            return res.status(401).json({ error: 'authorization_header_missing' });
        const parts = hdr.split(' ');
        const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : hdr;
        try {
            const payload = jsonwebtoken_1.default.verify(token, secret);
            req.jwt = payload;
        }
        catch (err) {
            return res.status(401).json({ error: 'jwt_invalid', message: err.message });
        }
    };
};
exports.JwtCheckFactory = JwtCheckFactory;
//# sourceMappingURL=jwt-check.factory.js.map