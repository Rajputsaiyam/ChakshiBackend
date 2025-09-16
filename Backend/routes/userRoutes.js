const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/sign-up', userController.handleSignUp);
router.post('/sign-in', userController.handleSignIn);
router.get('/me', userController.handleMe);

module.exports = router;