const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


router.get('/register', registerController.getRegister); //route for the actual register page
router.post('/register', registerController.postRegister); //route for the post method of register form

module.exports = router;