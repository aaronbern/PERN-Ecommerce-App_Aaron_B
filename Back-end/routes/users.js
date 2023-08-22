const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update-password/:username', userController.updateUserPassword);
router.delete('/:username', userController.deleteUser);

module.exports = router;
