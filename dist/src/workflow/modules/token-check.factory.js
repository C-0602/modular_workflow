"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCheckFactory = void 0;
const TokenCheckFactory = (options = {}) => {
    const { header = 'x-api-key', validTokens = [] } = options;
    return (req, res) => {
        const token = req.header(header);
        if (!token)
            return res.status(401).json({ error: 'token_missing' });
        if (!validTokens.includes(token))
            return res.status(403).json({ error: 'token_invalid' });
        req.apiToken = token;
    };
};
exports.TokenCheckFactory = TokenCheckFactory;
//# sourceMappingURL=token-check.factory.js.map