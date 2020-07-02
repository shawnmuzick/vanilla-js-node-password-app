const express = require("express");
const router = express.Router();
const passport = require("passport");
const { API_controller } = require("../controllers/");
const parse_json = express.json();
const parse_body = express.urlencoded({ extended: true });

const logger = (req, res, next) => {
    console.log("request recieved!");
    console.log(req.body);
    next();
};

router.get("/init", API_controller.auth.isLoggedIn, (req, res) => {
    res.send(req.user);
});

router.post("/record/create", parse_body, parse_json, API_controller.record.create);
router.get("/record/read", API_controller.record.read);
router.get("/record/read/:id", API_controller.record.read);
router.put("/record/update/:id", parse_body, parse_json, API_controller.record.update);
router.delete("/record/delete/:id", API_controller.record.delete);

router.post("/users/create", parse_body, parse_json, API_controller.user.create);
router.get("/users/read", API_controller.user.read);
router.get("/users/read/:id", API_controller.user.read);
router.put("/users/update/:id", parse_body, parse_json, API_controller.user.update);
router.delete("/users/delete/:id", API_controller.user.delete);

router.post(
    "/login",
    parse_body,
    parse_json,
    logger,
    passport.authenticate("local"),
    API_controller.auth.login
);
router.get("/logout", API_controller.auth.logout);

module.exports = router;
