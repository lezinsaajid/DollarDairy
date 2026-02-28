const errorMiddleware = (err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.url}:`, err.message);

    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

module.exports = errorMiddleware;
