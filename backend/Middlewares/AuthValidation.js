const Joi = require('joi');
const jwt = require('jsonwebtoken');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        location: Joi.string().min(4).max(100).required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
// const updateValidation = (req, res, next) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(100).optional(),
//         email: Joi.string().email().optional(),
//         location: Joi.string().min(4).max(100).optional(),
//         newPassword: Joi.string().min(4).max(100).optional(),
//         confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')).optional()
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: "Bad request", error });
//     }
//     next();
// };
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied', success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token', success: false });
        }
        req.user = user;
        next();
    });
};
module.exports = {
    signupValidation,
    loginValidation,
    authenticateToken
}