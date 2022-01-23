const express = require('express');
const router = express.Router();
const publicControllers = require('../controllers/publicControllers');
const verifyToken = require('../middlewaresAndHelpers/verifyToken');
const checkLoggedIn = require('../middlewaresAndHelpers/checkLoggedIn');

// [GET] /contact (access_right: public)
router.get('/contact',publicControllers.contact);

// [GET] /news (access_right: public)
router.get('/news',publicControllers.news);

// [GET] / (access_right: public)
router.get('/',verifyToken,checkLoggedIn, publicControllers.home);

module.exports = router;
