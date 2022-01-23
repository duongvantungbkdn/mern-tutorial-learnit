const express = require('express');
const router = express.Router();
const dataControllers = require('../controllers/dataControllers');
const verifyToken = require('../middlewaresAndHelpers/verifyToken')

// [POST] /data/create (access_right: private)
router.post('/create',verifyToken, dataControllers.create);

// [GET] /data/list (access_right: private)
router.get('/list',verifyToken, dataControllers.list);

// [GET] /data/:id (access_right: private)
//router.get('/:id', verifyToken, dataControllers.read);

// [PUT] /data/:id (access_right: private)
router.put('/:id',verifyToken, dataControllers.update);

// [DELETE] /data/:id (access_right: private)
router.delete('/:id',verifyToken, dataControllers.delete);

module.exports = router;
