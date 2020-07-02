const { userModel } = require("../models/");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const record = {
    create: (req, res) => {
        const { label, password } = req.body;
        const entry = {};
        entry[label] = password;
        const user = req.user;
        const error = { message: "You must be logged in!" };
        if (!user) res.send(error);
        else {
            userModel
                .updateOne(
                    { _id: user._id },
                    {
                        $push: { data: entry },
                    },
                    { new: true }
                )
                .exec((err, success) => {
                    if (err) throw err;
                    res.json(success);
                });
        }
    },
    read: () => {},
    update: () => {},
    delete: (req, res) => {
        const record_label = req.params.id;
        const user = req.user;
        const error = { message: "You must be logged in!" };
        if (!user) res.send(error);
        else {
            userModal.updateOne(
                { _id: user._id },
                { $pull: { data: record_label } },
                { new: true }
            );
        }
    },
};

const user = {
    create: (req, res) => {
        const { username, password } = req.body;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;
            if (hash) {
                let newUser = new userModel({
                    username,
                    password: hash,
                    data: [],
                });
                newUser.save((err, success) => {
                    console.log(success);
                    res.redirect("/login");
                });
            }
        });
    },
    read: () => {},
    update: () => {},
    delete: (req, res) => {
        const id = req.params.id;
        userModel.findByIdAndDelete({ _id: id }).exec((err, success) => {
            if (err) throw err;
            res.send(success);
        });
    },
};

const auth = {
    isLoggedIn: (req, res, next) => {
        console.log("checking is logged in");
        if (req.isAuthenticated()) {
            console.log("check passed");
            return next();
        } else {
            console.log("check failed");
            res.status(400).send({ message: "this is an error" });
            return;
        }
    },
    login: (req, res) => {
        if (!req.user) res.send("error");
        res.send(req.user);
    },
    logout: (req, res, next) => {
        req.logout();
        req.session.destroy();
        next();
    },
};
const API_controller = {
    record,
    user,
    auth,
};
module.exports = { API_controller };
