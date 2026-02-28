const { createClerkClient } = require('@clerk/clerk-sdk-node');
const env = require('../config/env');

const clerkClient = createClerkClient({ secretKey: env.CLERK_API_KEY });

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const sessionClaims = await clerkClient.verifyToken(token);

        // Attach user info to request
        req.auth = {
            userId: sessionClaims.sub,
        };

        next();
    } catch (error) {
        console.error('Auth Error:', error.message);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
