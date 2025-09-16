const app = require('./app');
const { 
  handleUnhandledRejection, 
  handleUncaughtException,
  logger 
} = require('./src/middleware/errorHandler');

// Handle uncaught exceptions
process.on('uncaughtException', handleUncaughtException);

// Handle unhandled promise rejections
process.on('unhandledRejection', handleUnhandledRejection);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});