const { userModel } = require("../models/");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const record = {
    create: (req, res) => {
        console.log("hello from api controller");
        const message = { message: "hello api response" };
        res.send(message);
    },
    read: () => {},
    update: () => {},
    delete: () => {},
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
    delete: () => {},
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
        res.send(req.user.data);
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
