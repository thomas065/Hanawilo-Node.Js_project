const User = require('../models/User');
const crypto = require('crypto');

const getUsers = async (req, res, next) => {
    // query parameter

    const filter = {};
    const options = {};

    if (Object.keys(req.query).length) {
        const { gender, userName, limit, sortByUserName } = req.query;

        if (gender) filter.options = true;
        if (userName) filter.userName = true;

        if (limit) options.limit = limit;
        if (sortByUserName) options.sort = { userName: sortByUserName };
    }

    try {
        const users = await User.find({}, filter, options);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(users);
    } catch (err) {
        next(err);
    }
};

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

const deleteUsers = async (req, res, next) => {
    try {
        const User = await User.deleteMany();
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(User);
    } catch (err) {
        next(err);
    }
};

// route for ./user/:userId'

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ message: `Welcome Back ${user} !` });
    } catch (err) {
        next(err);
    }
};

const putUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json(updateUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.userId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(deleteUser);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new Error('Please provide email and password');

    const user = await User.findOne({ email }).select('+password');

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new Error('Invalid credentials');

    sendTokenResponse(user, 200, res);
};

// for forgotten password

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error('No user with that email');

    const resetToken = user.getResetPasswordToken();

    try {
        await user.save({ validateBeforeSave: false });

        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ message: `Password was reset: ${resetToken}` });
        // try to use node-mailer to send email
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        throw new Error('Failed to reset password');
    }
};

// for reset password

const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex'); 

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new Error('Invalid token');

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
};

// for update password

const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const passwordMatches = await user.matchPassword(req.body.password);

    if (!passwordMatches) throw new Error('Invalid password');

    user.password = req.body.newPassword;

    await user.save();

    sendTokenResponse(user, 200, res);
};

// for logout

const logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true, // so that cookie can't be accessed by client side javascript
    });

    req.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Successfully Logged Out' });
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json(token);
};

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    putUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout,
};
