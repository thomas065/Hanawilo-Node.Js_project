const User = require('../models/User');

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
};
