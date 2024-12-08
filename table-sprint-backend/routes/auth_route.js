const express = require('express');
const { register, login } = require('../controller/auth');
const auth_router = express.Router();

auth_router.post('/register', register);
auth_router.post('/login', login);

module.exports = auth_router;
