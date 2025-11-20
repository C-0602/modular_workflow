"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCheckFactory = void 0;
const SessionCheckFactory = (options = {}) => {
    const { cookieName = 'sid' } = options;
    return (req, res) => {
        const cookies = (req.headers['cookie'] || '').split(';').map(c => c.trim()).filter(Boolean);
        const parsed = cookies.map(c => c.split('=')).reduce((acc, pair) => { acc[pair[0]] = pair[1]; return acc; }, {});
        if (!parsed[cookieName])
            return res.status(401).json({ error: 'session_missing' });
        req.sessionId = parsed[cookieName];
    };
};
exports.SessionCheckFactory = SessionCheckFactory;
//# sourceMappingURL=session-check.factory.js.map