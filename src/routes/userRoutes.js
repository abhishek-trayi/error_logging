const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  simulateDatabaseError,
  simulateExternalServiceError,
  simulateUnhandledError
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

// Error simulation routes (for testing)
router.get('/errors/database', simulateDatabaseError);
router.get('/errors/external-service', simulateExternalServiceError);
router.get('/errors/unhandled', simulateUnhandledError);

module.exports = router;