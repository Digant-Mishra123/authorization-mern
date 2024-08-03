const { signup, login, updateUser } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, authenticateToken } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put('/update', authenticateToken, updateUser);

module.exports = router;