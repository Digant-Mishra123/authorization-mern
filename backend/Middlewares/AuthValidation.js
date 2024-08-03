const Joi = require('joi');

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
const updateValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).optional(),
        email: Joi.string().email().optional(),
        location: Joi.string().min(4).max(100).optional(),
        newPassword: Joi.string().min(4).max(100).optional(),
        confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')).optional()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};
module.exports = {
    signupValidation,
    loginValidation,
    updateValidation
}