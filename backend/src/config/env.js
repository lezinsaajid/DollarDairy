const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file (adjust path if .env is not in project root)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Export commonly used environment variables for easy import
module.exports = {
    PORT: process.env.PORT || 7000,
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
};
