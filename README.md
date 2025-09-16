# Centralized Error Handling System for Node.js

A comprehensive error handling system that provides consistent error management across your Node.js application.

## Features

- **Custom Error Classes**: Predefined error types for common scenarios
- **Global Error Handler**: Centralized error processing and response formatting
- **Async Error Handling**: Automatic catching of async/await errors
- **Error Logging**: Winston-based logging with different levels
- **Environment-Aware**: Different error responses for development and production
- **Graceful Shutdown**: Proper handling of unhandled rejections and exceptions

## Error Types

- `ValidationError` (400) - Input validation failures
- `NotFoundError` (404) - Resource not found
- `UnauthorizedError` (401) - Authentication required
- `ForbiddenError` (403) - Access denied
- `ConflictError` (409) - Resource conflicts
- `DatabaseError` (500) - Database operation failures
- `ExternalServiceError` (503) - Third-party service failures

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Error Testing
- `GET /api/users/errors/database` - Simulate database error
- `GET /api/users/errors/external-service` - Simulate external service error
- `GET /api/users/errors/unhandled` - Simulate unhandled error

## Usage Examples

### Creating Custom Errors
```javascript
const ErrorFactory = require('./src/utils/errorFactory');

// Validation error
throw ErrorFactory.validation('Email is required');

// Not found error
throw ErrorFactory.notFound('User');

// Custom error
throw ErrorFactory.custom('Custom message', 422);
```

### Using Async Handler
```javascript
const asyncHandler = require('./src/middleware/asyncHandler');

const myController = asyncHandler(async (req, res, next) => {
  // Any thrown error will be automatically caught
  const data = await someAsyncOperation();
  res.json(data);
});
```

## Testing the System

1. Start the server: `npm run dev`
2. Test different error scenarios:
   - Invalid user ID: `GET /api/users/invalid`
   - Non-existent user: `GET /api/users/999`
   - Missing data: `POST /api/users` (empty body)
   - Database error: `GET /api/users/errors/database`

## Logging

Errors are logged to:
- `logs/error.log` - Error level logs only
- `logs/combined.log` - All logs
- Console (development only)

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)