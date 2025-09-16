const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const { globalErrorHandler } = require('./src/middleware/errorHandler');
const ErrorFactory = require('./src/utils/errorFactory');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Centralized Error Handling System API',
    endpoints: {
      users: '/api/users',
      errorTests: {
        database: '/api/users/errors/database',
        externalService: '/api/users/errors/external-service',
        unhandled: '/api/users/errors/unhandled'
      }
    }
  });
});

app.use('/api/users', userRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  next(ErrorFactory.notFound(`Route ${req.originalUrl}`));
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

module.exports = app;