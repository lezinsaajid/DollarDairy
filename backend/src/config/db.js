// Import env config first to load env vars
const env = require('./env.js');

// Import schema definitions
const schema = require('../db/schema.js');

// Import Neon compatible Pg pool and Drizzle ORM
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');

// Initialize Neon connection pool with SSL config
const pool = new Pool({
    url: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Create Drizzle client
const db = drizzle(pool);

// Now you can use db and schemas in your controllers/queries
module.exports = { db, schema };
