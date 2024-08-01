const { signup, login, updateProfile } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, updateProfileValidation} = require('../Middlewares/AuthValidation');
const authenticateToken = require('../Middlewares/AuthMiddleWare');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/update-profile', authenticateToken, updateProfileValidation,updateProfile);

module.exports = router;