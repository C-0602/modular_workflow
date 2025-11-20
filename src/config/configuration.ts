// -------------------------------
export default () => ({
app: {
name: 'ModularWorkflowService',
env: process.env.NODE_ENV || 'development',
port: parseInt(process.env.PORT || '8080', 10)
},


logging: {
level: process.env.LOG_LEVEL || 'info',
folder: process.env.LOG_FOLDER || 'logs',
rotation: {
maxFiles: process.env.LOG_MAX_FILES || '14d',
maxSize: process.env.LOG_MAX_SIZE || '20m'
}
},


forwarding: {
target: process.env.FORWARD_TO || 'https://test.test.com/'
},


apis: {
test: {
path: '/test',
workflow: [
{ name: 'validateSchema', options: { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } },
{ name: 'enumCheck', options: { field: 'role', allowed: ['admin', 'user', 'guest'] } },
{ name: 'tokenCheck', options: { header: 'x-api-key', validTokens: ['abc123', 'secretKey'] } },
{ name: 'jwtCheck', options: { header: 'authorization', secret: process.env.JWT_SECRET || 'my_jwt_secret' } },
{ name: 'sessionCheck', options: { cookieName: 'sid' } }
]
},
test2: {
path: '/test2',
workflow: [
{ name: 'validateSchema', options: { schema: { type: 'object', properties: { q: { type: 'number' } }, required: ['q'] } } }
]
}
}
});

