const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

// POST /user/login
router.post('/auth/login', userControllers.login);

//[POST] /user/auth/register
router.post('/auth/register', userControllers.auth);

module.exports = router;
