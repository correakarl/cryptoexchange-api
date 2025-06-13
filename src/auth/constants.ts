export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'my-secret-key',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '3600s',
};