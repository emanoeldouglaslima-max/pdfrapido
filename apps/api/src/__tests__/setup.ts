// Variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
process.env.PORT = '8081';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.MAX_FILE_SIZE_MB = '25';
process.env.RATE_LIMIT_PER_HOUR = '10';
process.env.CORS_ORIGIN = 'http://localhost:3000';
// Firebase desabilitado em testes
process.env.FIREBASE_PROJECT_ID = '';
