const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/login', loginController.getLogin); //route for the actual login page
router.post('/login', loginController.postLogin); //route for the post method of login form




module.exports = router;