export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret', // fallback if env not set
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'ref-secret',
    },
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASS ?? '1234',
        name: process.env.DB_NAME ?? 'moderator',
    },



})