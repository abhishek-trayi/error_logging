const asyncHandler = require('../middleware/asyncHandler');
const ErrorFactory = require('../utils/errorFactory');

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

/**
 * Get all users
 */
const getUsers = asyncHandler(async (req, res, next) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

/**
 * Get user by ID
 */
const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  // Validate ID
  if (!id || isNaN(id)) {
    throw ErrorFactory.validation('Invalid user ID provided');
  }
  
  // Simulate async database operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    throw ErrorFactory.notFound('User');
  }
  
  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

/**
 * Create new user
 */
const createUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  
  // Validation
  if (!name || !email) {
    throw ErrorFactory.validation('Name and email are required');
  }
  
  if (!email.includes('@')) {
    throw ErrorFactory.validation('Please provide a valid email address');
  }
  
  // Check for duplicate email
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw ErrorFactory.conflict('User with this email already exists');
  }
  
  // Simulate async database operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});

/**
 * Simulate database error
 */
const simulateDatabaseError = asyncHandler(async (req, res, next) => {
  // Simulate database connection failure
  throw ErrorFactory.database('Failed to connect to database', new Error('Connection timeout'));
});

/**
 * Simulate external service error
 */
const simulateExternalServiceError = asyncHandler(async (req, res, next) => {
  // Simulate external API failure
  throw ErrorFactory.externalService('Payment Gateway', 'Service temporarily unavailable');
});

/**
 * Simulate unhandled error
 */
const simulateUnhandledError = asyncHandler(async (req, res, next) => {
  // This will cause an unhandled error
  const obj = null;
  obj.someProperty; // This will throw TypeError
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  simulateDatabaseError,
  simulateExternalServiceError,
  simulateUnhandledError
};