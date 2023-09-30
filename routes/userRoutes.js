/* This code is creating a router object using the Express framework in JavaScript. It imports the
necessary functions from the userController.js file and the authMiddleware file. */
const express = require('express');
const router = express.Router();
const {registerUser, loginUser , getMe} = require('../controllers/userController.js');
const {protect} =  require('../middleware/authMiddleware');

router.post('/' , registerUser);
router.post('/login' , loginUser);
router.get('/me' , protect , getMe);


module.exports = router;

