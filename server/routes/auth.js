const express = require('express');
const { signupController, loginController } = require('../controller/authController');


const router = express.Router()

router.post('/signup', signupController);
router.post('/login', loginController);


module.exports = router;
