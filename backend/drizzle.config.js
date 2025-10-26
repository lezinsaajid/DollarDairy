const env = require('./src/config/env.js');

module.exports = {
    schema: './src/db/schema.js',
    out: './src/db/migrations',
    dialect: 'postgresql',              // As per your requirement
    // Option 1: full connection string
    dbCredentials: {
        url: env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    },
};
