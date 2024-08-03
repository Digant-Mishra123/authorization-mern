const { signup, login, updateUser } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, updateValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put('/update', updateValidation, updateUser);

module.exports = router;