const User = require('../models/User');

const getUsers = async (req, res, next) => {
    // query parameter

    const filter = {};
    const options = {};

    if (Object.keys(req.query).length) {
        const {
            gender,
            userName,
            limit,
            sortByUserName,
        } = req.query;

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
    }   catch (err) {
        next(err);
    }
};

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json(user);
    }   catch (err) {
        next(err);
    }
};

const deleteUsers = async (req, res, next) => {
    try {
        const User = await User.deleteMany();
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(User);
    }  catch (err) {
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
        const updateUser = await user.findByIdAndUpdate(req.params.userId, req.body, {new: true});
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

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    putUser,
    deleteUser,
};
