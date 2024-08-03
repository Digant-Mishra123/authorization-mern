const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email,location,password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, location,password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name,
                location:user.location
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
const updateUser = async (req, res) => {
    try {
        const { name, email, location, newPassword } = req.body;
        const userId = req.user._id;

        const updateData = { name, email, location };
        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({
            message: 'User updated successfully',
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
module.exports = {
    signup,
    login,
    updateUser
}